import forEach from 'lodash.foreach';
import Combobox from 'components/input-options/combobox';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

@dataConnect(
  () => ({
    fragments: {
      schemas: {
        _id: 1,
        title: 1
      }
    }
  })
)
export default class SchemaPickerContainer extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
    schemas: PropTypes.array.isRequired
  };

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
