import Component from 'components/component';
import React, {PropTypes} from 'react';

import Entry from './entry';

export default class List extends Component {
  static fragments = {
    users: Entry.fragments.user
  };

  static propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired
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
    const {onDelete, search, display} = this.props;
    const inSearch = !search || user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    if (inSearch) {
      return (
        <Entry
          user={user}
          onDelete={onDelete}
          display={display}
          key={user._id}
        />
      );
    }
  }
}
