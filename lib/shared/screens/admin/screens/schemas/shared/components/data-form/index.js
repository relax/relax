import * as schemaEntryActions from 'actions/schema-entry';
import Component from 'components/component';
import bind from 'decorators/bind';
import getContextFragment from 'helpers/page-builder/get-context-fragment';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {changeDocProperty, openDropDraftConfirmation, openPushChangesConfirmation} from 'actions/page-builder';
import {dataConnect} from 'relate-js';

import DataSchemaForm from './form';

@dataConnect(
  (state, props) => {
    const result = {
      schemaId: state.router.params.id,
      entryId: state.router.params.entryId
    };

    if (props.isNew) {
      const {schemaEntry} = state;

      result.values = schemaEntry.properties || {};
      result.saving = schemaEntry.saving;
      result.saved = schemaEntry.saved;
    } else {
      const {pageBuilder} = state;

      const fragment = getContextFragment(pageBuilder, {doc: 'draft'});

      result.values = fragment.doc && fragment.doc.properties || {};
      result.saving = pageBuilder.state === 'loading';
      result.draftHasChanges = fragment.actions.length > 0 || pageBuilder.restored;
      result.draftID = pageBuilder.id;
      result.itemId = pageBuilder.itemId;
    }

    return result;
  },
  (dispatch) => bindActionCreators({
    ...schemaEntryActions,
    changeDocProperty,
    openDropDraftConfirmation,
    openPushChangesConfirmation
  }, dispatch),
  (props) => ({
    fragments: {
      schema: {
        _id: 1,
        properties: 1,
        type: 1
      }
    },
    variablesTypes: {
      schema: {
        id: 'ID!'
      }
    },
    initialVariables: {
      schema: {
        id: props.schemaId
      }
    }
  })
)
export default class DataSchemaFormContainer extends Component {
  static propTypes = {
    schemaId: PropTypes.string.isRequired,
    changeSchemaEntryToDefaults: PropTypes.func.isRequired,
    changeSchemaEntryFields: PropTypes.func.isRequired,
    changeSchemaEntryProperty: PropTypes.func.isRequired,
    changeDocProperty: PropTypes.func.isRequired,
    addSchemaEntry: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    schema: PropTypes.object,
    saving: PropTypes.bool,
    saved: PropTypes.bool,
    isNew: PropTypes.bool,
    // draft
    draftHasChanges: PropTypes.bool,
    draftID: PropTypes.string
  };

  getInitState () {
    return {
      removeConfirm: false
    };
  }

  @bind
  onSubmit () {
    const {isNew} = this.props;

    if (isNew) {
      const {schemaId, schema, values} = this.props;

      this.props.addSchemaEntry(schemaId, schema.type, {
        properties: values
      }, true);
    } else {
      this.props.openPushChangesConfirmation();
    }
  }

  @bind
  onChangeProperty (key, value) {
    const {isNew} = this.props;

    if (isNew) {
      this.props.changeSchemaEntryProperty(key, value);
    } else {
      this.props.changeDocProperty(`properties#${key}`, value);
    }
  }

  render () {
    const {
      loading,
      schema,
      values,
      schemaId,
      saving,
      saved,
      isNew,
      draftHasChanges
    } = this.props;

    return (
      <DataSchemaForm
        {...this.state}
        schemaId={schemaId}
        properties={schema && schema.properties}
        loading={loading}
        values={values}
        onChange={this.onChangeProperty}
        saving={saving}
        saved={saved}
        isNew={isNew}
        draftHasChanges={draftHasChanges}
        openDropDraftConfirmation={this.props.openDropDraftConfirmation}
        onSubmit={this.onSubmit}
      />
    );
  }
}
