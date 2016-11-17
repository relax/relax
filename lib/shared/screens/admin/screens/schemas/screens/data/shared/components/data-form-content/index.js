import * as schemaEntryActions from 'actions/schema-entry';
import Component from 'components/component';
import bind from 'decorators/bind';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import DataSchemaForm from './form';

@connect(
  (state) => ({
    schemaId: state.router.params.id,
    entryId: state.router.params.entryId,
    removing: state.schemaEntry.removing
  }),
  (dispatch) => bindActionCreators(schemaEntryActions, dispatch)
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
