import Component from 'components/component';
import Content from 'components/content';
import DataSchemaForm from 'components/data-form';
import React from 'react';

export default class DataSchemaNewEntry extends Component {
  render () {
    return (
      <Content noOffset>
        <DataSchemaForm isNew />
      </Content>
    );
  }
}
