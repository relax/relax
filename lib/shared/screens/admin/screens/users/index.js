import bind from 'decorators/bind';
import debounce from 'decorators/debounce';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {removeUser} from 'actions/users';
import {pushState} from 'react-router';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Users from './components/users.jsx';

@dataConnect(
  () => ({}),
  (dispatch) => bindActionCreators({removeUser}, dispatch),
  () => ({
    fragments: Users.fragments,
    mutations: {
      addUser: [{
        type: 'APPEND',
        field: 'users'
      }]
    }
  })
)
export default class UsersContainer extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    removeUser: PropTypes.func.isRequired
  };

  static defaultProps = {
    users: []
  };

  getInitState () {
    return {
      newOpened: false
    };
  }

  @bind
  openNew () {
    this.setState({
      newOpened: true
    });
  }

  @bind
  closeNew () {
    this.setState({
      newOpened: false
    });
  }

  @bind
  searchChange (search) {
    this.setState({
      search
    });
    this.updateSearch();
  }

  @debounce(300)
  updateSearch () {
    const {location} = this.props;
    const query = Object.assign({}, location.query, {
      s: this.state.search
    });
    this.context.store.dispatch(pushState(null, location, query));
  }

  @bind
  onDelete (user) {
    this.setState({
      deleteConfirm: true,
      deleteConfirmUser: user
    });
  }

  @bind
  cancelDelete () {
    this.setState({
      deleteConfirm: false,
      deleteConfirmUser: null,
      deletingUser: false
    });
  }

  @bind
  confirmDelete () {
    const {deleteConfirmUser} = this.state;
    this.setState({
      deletingUser: true
    });
    this.props.removeUser(deleteConfirmUser._id).then(() => {
      this.cancelDelete();
    });
  }

  render () {
    const {users} = this.props;
    return (
      <Users
        users={users}
        {...this.state}
        openNew={this.openNew}
        closeNew={this.closeNew}
        onDelete={this.onDelete}
        cancelDelete={this.cancelDelete}
        confirmDelete={this.confirmDelete}
      />
    );
  }
}
