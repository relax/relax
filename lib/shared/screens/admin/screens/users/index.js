import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Users from './components/users.jsx';

@dataConnect()
@connect(
  (state) => ({
    users: state.users.data.items
  })
)
export default class UsersContainer extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
  };

  initialize () {
    this.props.fetchData({
      fragments: Users.fragments
    });
  }

  render () {
    const {users} = this.props;
    return (
      <Users
        users={users}
      />
    );
  }
}
