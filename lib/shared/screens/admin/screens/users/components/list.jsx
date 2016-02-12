import Component from 'components/component';
import React, {PropTypes} from 'react';

import Entry from './entry';

export default class List extends Component {
  static fragments = {
    users: Entry.fragments.user
  };

  static propTypes = {
    users: PropTypes.array.isRequired
  };

  render () {
    const {users} = this.props;
    return (
      <div>
        {users.map(this.renderEntry, this)}
      </div>
    );
  }

  renderEntry (user) {
    return (
      <Entry user={user} key={user._id} />
    );
  }
}
