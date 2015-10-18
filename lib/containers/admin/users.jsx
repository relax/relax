import React, {PropTypes} from 'react';
import {Component, buildQueryAndVariables} from 'relax-framework';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import queryProps from '../../decorators/query-props';
import Users from '../../components/admin/panels/users';

import * as usersActions from '../../actions/users';

@connect(
  (state) => ({
    users: state.users.data.items,
    count: state.users.data.count
  }),
  (dispatch) => bindActionCreators(usersActions, dispatch)
)
@queryProps({
  page: 1,
  limit: 10
})
export default class UsersContainer extends Component {
  static fragments = Users.fragments

  static propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    users: PropTypes.array,
    query: PropTypes.object,
    count: PropTypes.number,
    hasQueryChanged: PropTypes.bool.isRequired,
    queryVariables: PropTypes.object.isRequired,
    removeUser: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired
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

  static panelSettings = {
    activePanelType: 'users',
    breadcrumbs: [
      {
        label: 'Users'
      }
    ]
  }

  onAddNew (newUser) {
    this.props
      .addUser({user: Users.fragments.users}, newUser)
      .then(() => {
        this.onCloseLightbox();
      });
  }

  onAddNewClick (event) {
    event.preventDefault();
    this.setState({
      lightbox: true
    });
  }

  onCloseLightbox () {
    this.setState({
      lightbox: false
    });
  }

  render () {
    return (
      <Users
        {...this.props}
        {...this.state}
        onAddNew={::this.onAddNew}
        onAddNewClick={::this.onAddNewClick}
        onCloseLightbox={::this.onCloseLightbox}
      />
    );
  }
}
