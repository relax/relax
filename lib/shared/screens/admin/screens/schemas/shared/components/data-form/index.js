import * as schemaEntryActions from 'actions/schema-entry';
import Component from 'components/component';
import bind from 'decorators/bind';
import React, {PropTypes} from 'react';
import {autosave, changeDocProperty, drop, save} from 'actions/page-builder';
import {bindActionCreators} from 'redux';
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

      result.values = pageBuilder.doc && pageBuilder.doc.properties || {};
      result.saving = pageBuilder.state === 'loading';
      result.state = pageBuilder.state;
      result.stateMessage = pageBuilder.stateMessage;
      result.draftHasChanges = state.pageBuilder.actions.length > 0;
      result.draftActionsNumb = state.pageBuilder.actions.length;
      result.draftID = state.pageBuilder.id;
      result.itemId = state.pageBuilder.itemId;
    }

    return result;
  },
  (dispatch) => bindActionCreators({
    ...schemaEntryActions,
    changeDocProperty,
    autosave,
    save,
    drop
  }, dispatch),
  (props) => {
    const result = {
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
        },
        draft: {
          id: 'ID!',
          type: 'String!'
        }
      },
      initialVariables: {
        schema: {
          id: props.schemaId
        }
      }
    };

    if (!props.isNew && props.entryId !== props.itemId) {
      result.fragments.draft = {
        _id: 1,
        __v: 1,
        itemId: 1,
        userId: 1,
        type: 1,
        doc: 1,
        actions: 1
      };
      result.initialVariables.draft = {
        id: props.entryId,
        type: props.schemaId
      };
    }

    return result;
  }
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
    schemaEntry: PropTypes.object,
    schema: PropTypes.object,
    saving: PropTypes.bool,
    saved: PropTypes.bool,
    isNew: PropTypes.bool,
    // draft
    draftHasChanges: PropTypes.bool,
    draftActionsNumb: PropTypes.number,
    draftID: PropTypes.string,
    state: PropTypes.string,
    stateMessage: PropTypes.string,
    drop: PropTypes.func.isRequired,
    autosave: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired
  };

  getInitState () {
    return {
      removeConfirm: false
    };
  }

  componentDidMount () {
    window.addEventListener('beforeunload', this.preventNavigation);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.draftActionsNumb !== this.props.draftActionsNumb &&
        nextProps.draftID === this.props.draftID) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = setTimeout(this.saveDraft, 2000);
    }
  }

  componentWillUnmount () {
    this.saveDraft();
    window.removeEventListener('beforeunload', this.preventNavigation);
  }

  @bind
  preventNavigation (event) {
    if (this.saveTimeout) {
      const confirmationMessage = 'Your draft has not been saved yet!';
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    }
  }

  @bind
  saveDraft () {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = false;
      this.props.autosave();
    }
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
      this.props.save();
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
      draftHasChanges,
      state,
      stateMessage
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
        state={state}
        stateMessage={stateMessage}
        onDrop={this.props.drop}
        onSubmit={this.onSubmit}
      />
    );
  }
}
