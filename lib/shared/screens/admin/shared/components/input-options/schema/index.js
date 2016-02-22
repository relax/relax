import dataConnect from 'decorators/data-connector';
import forEach from 'lodash.foreach';
import Combobox from 'components/input-options/combobox';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

@dataConnect()
@connect(
  (state) => ({
    schemas: state.schemas.data.items
  })
)
export default class SchemaPickerContainer extends Component {
  static fragments = {
    schemas: {
      _id: 1,
      title: 1
    }
  };

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
    schemas: PropTypes.array.isRequired,
    fetchData: PropTypes.func.isRequired
  };

  initialize () {
    this.props.fetchData({
      fragments: this.constructor.fragments
    });
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
