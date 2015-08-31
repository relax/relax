import React from 'react';
import {Component} from 'relax-framework';
import Entry from './entry';

export default class Schemas extends Component {
  renderEntry (schema) {
    return (
      <Entry key={schema._id} schema={schema} />
    );
  }

  render () {
    return (
      <div className='list'>
        {this.props.data.map(this.renderEntry, this)}
      </div>
    );
  }
}
