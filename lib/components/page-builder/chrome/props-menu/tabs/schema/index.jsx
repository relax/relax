import React from 'react';
import {Component} from 'relax-framework';
import GeminiScrollbar from 'react-gemini-scrollbar';
import forEach from 'lodash.foreach';
import cloneDeep from 'lodash.clonedeep';

import SchemaProperties from './schema-properties';
import Combobox from '../../../../../combobox';

import schemasStore from '../../../../../../client/stores/schemas';

export default class Schema extends Component {
  getInitialCollections () {
    return {
      schemas: schemasStore.getCollection()
    };
  }

  onSchemaChange (value) {
    var cloned = cloneDeep(this.context.page.schema || {});
    cloned.schema = value;
    this.context.setPageSchema(cloned);
  }

  renderCombobox () {
    if (this.state.schemas) {
      var props = {
        value: this.context.page.schema && this.context.page.schema.schema || '',
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
    if (this.context.page.schema && this.context.page.schema.schema) {
      return (
        <SchemaProperties
          value={this.context.page.schema}
        />
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
  page: React.PropTypes.object.isRequired,
  setPageSchema: React.PropTypes.func.isRequired
};
