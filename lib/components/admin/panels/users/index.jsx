import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';

import Breadcrumbs from '../../../breadcrumbs';
import Filter from '../../../filter';
import Lightbox from '../../../lightbox';
import List from './list';
import New from './new';
import Pagination from '../../../pagination';

export default class Users extends Component {
  static fragments = mergeFragments({
    usersCount: {
      count: 1
    }
  }, List.fragments)

  static propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    users: PropTypes.array,
    query: PropTypes.object,
    count: PropTypes.number,
    lightbox: PropTypes.boolean,
    removeUser: PropTypes.func.isRequired,
    onAddNew: PropTypes.func.isRequired,
    onAddNewClick: PropTypes.func.isRequired,
    onCloseLightbox: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className='admin-users'>
        <div className='filter-menu'>
          <Breadcrumbs data={this.props.breadcrumbs} />
          <a href='#' className='button-clean' onClick={this.props.onAddNewClick}>
            <i className='material-icons'>person_add</i>
            <span>Add new user</span>
          </a>
          <Filter
            sorts={[
              {label: 'Date', property: '_id'},
              {label: 'Username', property: 'username'},
              {label: 'Email', property: 'email'}
            ]}
            url='/admin/users'
            search='username'
            query={this.props.query}
            history={this.props.history}
          />
        </div>
        <div className='admin-scrollable'>
          <List
            users={this.props.users}
            removeUser={this.props.removeUser}
          />
          <Pagination
            url='/admin/users'
            query={this.props.query}
            count={this.props.count}
          />
        </div>
        {this.renderLightbox()}
      </div>
    );
  }

  renderLightbox () {
    if (this.props.lightbox) {
      return (
        <Lightbox className='small' title='Add user' onClose={this.props.onCloseLightbox}>
          <New onSubmit={this.props.onAddNew} />
        </Lightbox>
      );
    }
  }
}
