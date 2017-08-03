import * as schemaEntryActions from 'actions/schema-entry';
import Component from 'components/component';
import bind from 'decorators/bind';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import DataSchemaForm from './form';

@dataConnect(
  (state) => ({
    schemaId: state.router.params.id,
    entryId: state.router.params.entryId,
    removing: state.schemaEntry.removing
  }),
  (dispatch) => bindActionCreators(schemaEntryActions, dispatch),
  (props) => {
    let result = {};

    if (props.entryId) {
      result = {
        fragments: {
          draft: {
            _id: 1,
            __v: 1,
            itemId: 1,
            userId: 1,
            type: 1,
            doc: 1,
            actions: 1,
            restored: 1
          }
        },
        variablesTypes: {
          draft: {
            id: 'ID!',
            type: 'String!'
          }
        },
        initialVariables: {
          draft: {
            id: props.entryId,
            type: props.schemaId
          }
        }
      };
    }

    return result;
  }
)
export default class DataSchemaFormContainer extends Component {
  static propTypes = {
    schemaId: PropTypes.string.isRequired,
    entryId: PropTypes.string,
    removeSchemaEntry: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    saved: PropTypes.bool,
    isNew: PropTypes.bool,
    removing: PropTypes.bool
  };

  getInitState () {
    return {
      removeConfirm: false
    };
  }

  @bind
  toggleRemoveConfirm () {
    this.setState({
      removeConfirm: !this.state.removeConfirm
    });
  }

  @bind
  removeEntry () {
    const {removeSchemaEntry, schemaId, entryId} = this.props;
    removeSchemaEntry(schemaId, entryId, true, 'data');
  }

  render () {
    const {
      schemaId,
      isNew,
      removing
    } = this.props;

    return (
      <DataSchemaForm
        {...this.state}
        schemaId={schemaId}
        removing={removing}
        isNew={isNew}
        toggleRemoveConfirm={this.toggleRemoveConfirm}
        removeEntry={this.removeEntry}
      />
    );
  }
}
