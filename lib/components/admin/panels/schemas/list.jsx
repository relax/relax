import React from 'react';
import {Component} from 'relax-framework';
import Entry from './entry';

export default class Schemas extends Component {
  static fragments = {
    schemas: Entry.fragments.schema
  }

  static propTypes = {
    schemas: React.PropTypes.array,
    removeSchema: React.PropTypes.func
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
    if (this.props.schemas && this.props.schemas.length > 0) {
      result = this.props.schemas.map(this.renderEntry, this);
    } else {
      result = (
        <div className='none-warning'>
          <div className='none-icon-part'>
            <i className='material-icons'>error_outline</i>
          </div>
          <div className='none-info-part'>
            <p>No schemas created yet!</p>
            <p>You can add new schemas on the add new button above</p>
          </div>
        </div>
      );
    }
    return result;
  }

  renderEntry (schema) {
    return (
      <Entry
        key={schema._id}
        schema={schema}
        removeSchema={this.props.removeSchema}
      />
    );
  }
}
