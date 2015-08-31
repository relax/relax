import React from 'react';
import {Component} from 'relax-framework';
import Entry from './entry';

export default class Schemas extends Component {
  renderEntry (schema) {
    return (
      <Entry key={schema._id} schema={schema} />
    );
  }

  renderEntries () {
    if (this.props.data && this.props.data.length > 0) {
      return this.props.data.map(this.renderEntry, this);
    } else {
      return (
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
  }

  render () {
    return (
      <div className='list'>
        {this.renderEntries()}
      </div>
    );
  }
}
