import React from 'react';
import {Component} from 'relax-framework';
import Entry from './entry';

export default class List extends Component {
  renderEntry (user) {
    return (
      <Entry key={user._id} user={user} />
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
