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

  getInitState () {
    return {
      newOpened: false
    };
  }

  initialize () {
    this.props.fetchData({
      fragments: Users.fragments
    });
  }

  openNew () {
    this.setState({
      newOpened: true
    });
  }

  closeNew () {
    this.setState({
      newOpened: false
    });
  }

  render () {
    const {users} = this.props;
    return (
      <Users
        users={users}
        {...this.state}
        openNew={::this.openNew}
        closeNew={::this.closeNew}
      />
    );
  }
}
