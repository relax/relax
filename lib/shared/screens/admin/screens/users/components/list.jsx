import Component from 'components/component';
import React, {PropTypes} from 'react';

import Entry from './entry';

export default class List extends Component {
  static fragments = {
    users: Entry.fragments.user
  };

  static propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
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
    const {onDelete} = this.props;
    return (
      <Entry user={user} onDelete={onDelete} key={user._id} />
    );
  }
}
