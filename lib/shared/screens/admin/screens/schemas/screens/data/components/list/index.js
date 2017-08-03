import React from 'react';
import PropTypes from 'prop-types';

import Component from 'components/component';
import List from './list';
import bind from 'decorators/bind';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';
import {push} from 'redux-router';

@dataConnect(
  (state) => ({
    id: state.router.params.id
  }),
  (dispatch) => bindActionCreators({push}, dispatch),
  (props) => ({
    fragments: {
      schemaList: List.fragments.schemaList
    },
    variablesTypes: {
      schemaList: {
        schemaId: 'ID!'
      }
    },
    initialVariables: {
      schemaList: {
        schemaId: props.id
      }
    }
  })
)
export default class DataSchemaListContainer extends Component {
  static fragments = List.fragments;

  static propTypes = {
    id: PropTypes.string.isRequired,
    schema: PropTypes.object.isRequired,
    schemaList: PropTypes.array
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.id !== nextProps.id && nextProps.id) {
      this.props.relate.refresh(nextProps);
    }
  }

  @bind
  onEntryClick (entry) {
    const {id} = this.props;
    this.props.push(`/admin/schemas/data/${id}/${entry._id}`);
  }

  render () {
    const {schema, schemaList} = this.props;
    return (
      <List
        schema={schema}
        schemaList={schemaList}
        onEntryClick={this.onEntryClick}
      />
    );
  }
}
