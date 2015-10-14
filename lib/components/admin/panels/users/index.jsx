import React, {PropTypes} from 'react';
import {Component, buildQueryAndVariables} from 'relax-framework';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Breadcrumbs from '../../../breadcrumbs';
import List from './list';
import Filter from '../../../filter';
import Pagination from '../../../pagination';
import Lightbox from '../../../lightbox';
import New from './new';
import queryProps from '../../../../decorators/query-props';

import * as usersActions from '../../../../actions/users';

@connect(
  (state) => ({
    users: state.users.data.items,
    count: state.users.data.count
  }),
  (dispatch) => bindActionCreators(usersActions, dispatch)
)
@queryProps
export default class Users extends Component {
  static fragments = List.fragments

  static propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    users: PropTypes.array,
    query: PropTypes.object,
    count: PropTypes.number,
    hasQueryChanged: PropTypes.bool.isRequired,
    queryVariables: PropTypes.object.isRequired,
    removeUser: PropTypes.func.isRequired
  }

  getInitialState () {
    return {
      lightbox: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.hasQueryChanged) {
      const vars = {
        users: {
          ...nextProps.queryVariables
        }
      };

      nextProps
        .getAdmin(buildQueryAndVariables(
          this.constructor.fragments,
          vars
        ))
        .done();
    }
  }

  onAddNew (newUser) {

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

  render () {
    return (
      <div className='admin-users'>
        <div className='filter-menu'>
          <Breadcrumbs data={this.props.breadcrumbs} />
          <a href='#' className='button-clean' onClick={this.addNewClick.bind(this)}>
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
    if (this.state.lightbox) {
      return (
        <Lightbox className='small' title='Add user' onClose={this.closeLightbox.bind(this)}>
          <New onSubmit={this.onAddNew.bind(this)} />
        </Lightbox>
      );
    }
  }
}
