import * as schemaEntryActions from 'actions/schema-entry';

import React, {PropTypes} from 'react';

import Component from 'components/component';
import DataSchemaForm from './form';
import bind from 'decorators/bind';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

@connect(
  (state) => ({
    schemaId: state.router.params.id,
    removing: state.schemaEntry.removing
  }),
  (dispatch) => bindActionCreators(schemaEntryActions, dispatch)
)
export default class DataSchemaFormContainer extends Component {
  static propTypes = {
    schemaId: PropTypes.string.isRequired,
    removeSchemaEntry: PropTypes.func.isRequired,
    schemaEntry: PropTypes.object,
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
    const {removeSchemaEntry, schemaId, schemaEntry} = this.props;
    removeSchemaEntry(schemaId, schemaEntry._id, true, 'data');
  }

  render () {
    const {
      schemaId,
      isNew,
      removing,
      schemaEntry
    } = this.props;

    return (
      <DataSchemaForm
        {...this.state}
        schemaId={schemaId}
        removing={removing}
        isNew={isNew}
        schemaEntry={schemaEntry}
        toggleRemoveConfirm={this.toggleRemoveConfirm}
        removeEntry={this.removeEntry}
      />
    );
  }
}
