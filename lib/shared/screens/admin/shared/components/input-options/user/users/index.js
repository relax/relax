import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {dataConnect} from 'relate-js';

import Users from './users';

@dataConnect(
  () => ({
    fragments: Users.fragments
  })
)
export default class UsersListContainer extends Component {
  static propTypes = {
    selectedUser: PropTypes.object,
    users: PropTypes.array,
    loading: PropTypes.loading,
    element: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    toggleOpened: PropTypes.func.isRequired
  };

  render () {
    const {users, loading, selectedUser, element, onChange, toggleOpened} = this.props;
    return (
      <Users
        users={users}
        loading={loading}
        selectedId={selectedUser && selectedUser._id}
        element={element}
        onChange={onChange}
        toggleOpened={toggleOpened}
      />
    );
  }
}
