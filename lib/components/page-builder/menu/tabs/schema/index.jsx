import forEach from 'lodash.foreach';
import GeminiScrollbar from 'react-gemini-scrollbar';
import React from 'react';
import {Component} from 'relax-framework';

import schemasStore from '../../../../../client/stores/schemas';
import Combobox from '../../../../combobox';
import SchemaProperties from './schema-properties';

export default class Schema extends Component {
  getInitialCollections () {
    let collections = {};

    if (!this.context.schema) {
      collections.schemas = schemasStore.getCollection();
    }

    return collections;
  }

  onSchemaChange (value) {
    this.context.setPageSchema(value);
  }

  renderCombobox () {
    if (this.state.schemas) {
      var props = {
        value: this.context.page.schema || '',
        values: [],
        labels: [],
        onChange: this.onSchemaChange.bind(this)
      };
      forEach(this.state.schemas, (schema) => {
        props.values.push(schema._id);
        props.labels.push(schema.title);
      });

      return (
        <div className='option'>
          <div className='label'>Schema</div>
          <Combobox {...props}/>
        </div>
      );
    }
  }

  renderProperties () {
    if (this.context.schema || this.context.page.schema) {
      return (
        <SchemaProperties value={this.context.schema && this.context.schema.schemaLinks || this.context.page.schemaLinks || {}} schemaSlug={this.context.page && this.context.page.schema} />
      );
    }
  }

  render () {
    return (
      <div className='content-scrollable'>
        <GeminiScrollbar autoshow={true}>
          <div className='advanced-menu-structure'>
            {this.renderCombobox()}
            {this.renderProperties()}
          </div>
        </GeminiScrollbar>
      </div>
    );
  }
}

Schema.contextTypes = {
  page: React.PropTypes.object,
  schema: React.PropTypes.object,
  setPageSchema: React.PropTypes.func
};
