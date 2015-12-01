import * as adminActions from '../../client/actions/admin';

import forEach from 'lodash.foreach';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import Combobox from '../../components/data-types/combobox';

@connect(
  (state) => ({
    schemas: state.schemas.data.items
  }),
  (dispatch) => bindActionCreators(adminActions, dispatch)
)
export default class SchemaPickerContainer extends Component {
  static fragments = {
    schemas: {
      _id: 1,
      title: 1
    }
  }

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
    schemas: PropTypes.array.isRequired,
    getAdmin: PropTypes.func.isRequired
  }

  getInitState () {
    this.props.getAdmin(buildQueryAndVariables(this.constructor.fragments, {})).done();
  }

  render () {
    const labels = [];
    const values = [];

    forEach(this.props.schemas, (schema) => {
      labels.push(schema.title);
      values.push(schema._id);
    });

    return (
      <Combobox
        value={this.props.value}
        onChange={this.props.onChange}
        values={values}
        labels={labels}
      />
    );
  }
}
