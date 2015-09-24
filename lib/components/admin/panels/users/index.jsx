import React from 'react';
import {Component} from 'relax-framework';
import List from './list';
import Filter from '../../../filter';
import Lightbox from '../../../lightbox';
import New from './new';

import userActions from '../../../../client/actions/user';
import usersStore from '../../../../client/stores/users';

export default class Users extends Component {
  getInitialState () {
    return {
      users: this.context.users,
      search: (this.context.query && this.context.query.s) || '',
      lightbox: false
    };
  }

  getInitialCollections () {
    return {
      users: usersStore.getCollection()
    };
  }

  onAddNew (newUser) {
    userActions
      .add(newUser)
      .then(() => {
        this.setState({
          lightbox: false
        });
      });
  }

  addNewClick (event) {
    event.preventDefault();
    this.setState({
      lightbox: true
    });
  }

  closeLightbox () {
    this.setState({
      lightbox: false
    });
  }

  renderLightbox () {
    if (this.state.lightbox) {
      return (
        <Lightbox className='small' title='Add user' onClose={this.closeLightbox.bind(this)}>
          <New onSubmit={this.onAddNew.bind(this)} />
        </Lightbox>
      );
    }
  }

  render () {
    return (
      <div className='admin-users'>
        <div className='filter-menu'>
          <span className='admin-title'>Users</span>
          <a href='#' className='button-clean' onClick={this.addNewClick.bind(this)}>
            <i className='material-icons'>person_add</i>
            <span>Add new user</span>
          </a>
          <Filter
            sorts={[{label: 'Date', property: '_id'}, {label: 'Username', property: 'username'}, {label: 'Email', property: 'email'}]}
            url='/admin/users'
            search='username'
          />
        </div>
        <div className='admin-scrollable'>
          <List data={this.state.users} />
        </div>
        {this.renderLightbox()}
      </div>
    );
  }
}

Users.contextTypes = {
  users: React.PropTypes.array.isRequired,
  query: React.PropTypes.object
};
