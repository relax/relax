import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import Entry from './entry';

export default class List extends Component {
  static fragments = {
    users: Entry.fragments.user
  }

  static propTypes = {
    users: PropTypes.array,
    removeUser: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className='list'>
        {this.props.users.map(this.renderEntry, this)}
      </div>
    );
  }

  renderEntry (user) {
    return (
      <Entry key={user._id} user={user} removeUser={this.props.removeUser} />
    );
  }
}
