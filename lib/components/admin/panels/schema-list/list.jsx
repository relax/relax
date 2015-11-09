import React from 'react';
import {Component} from 'relax-framework';

import Entry from './entry';

export default class List extends Component {
  static fragments = {
    schemaList: Entry.fragments.schemaEntry,
    schema: Entry.fragments.schema
  }

  static propTypes = {
    schemaList: React.PropTypes.array.isRequired,
    schema: React.PropTypes.object.isRequired,
    removeSchemaEntry: React.PropTypes.func.isRequired
  }

  render () {
    return (
      <div className='list'>
        {this.renderEntries()}
      </div>
    );
  }

  renderEntries () {
    let result;
    if (this.props.schemaList && this.props.schemaList.length > 0) {
      result = this.props.schemaList.map(this.renderEntry, this);
    } else {
      result = (
        <div className='none-warning'>
          <div className='none-icon-part'>
            <i className='material-icons'>error_outline</i>
          </div>
          <div className='none-info-part'>
            <p>No entry created yet on this schema!</p>
            <p>You can add new entries on the add new button above</p>
          </div>
        </div>
      );
    }
    return result;
  }

  renderEntry (schemaEntry) {
    return (
      <Entry
        key={schemaEntry._id}
        schema={this.props.schema}
        schemaEntry={schemaEntry}
        removeSchemaEntry={this.props.removeSchemaEntry}
      />
    );
  }
}
