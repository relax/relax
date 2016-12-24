import Component from 'components/component';
import DataSchemaForm from 'components/data-form-content';
import React from 'react';

export default class DataSchemaNewEntry extends Component {
  render () {
    return (
      <DataSchemaForm isNew />
    );
  }
}
