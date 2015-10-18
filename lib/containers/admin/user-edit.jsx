import React from 'react';
import {Component} from 'relax-framework';
import {connect} from 'react-redux';

import UserEdit from '../../components/admin/panels/user-edit';

@connect(
  (state) => ({
    user: state.user.data,
    errors: state.user.errors
  })
)
export default class UserEditContainer extends Component {
  static fragments = UserEdit.fragments

  static propTypes = {
    user: React.PropTypes.object.isRequired,
    breadcrumbs: React.PropTypes.array.isRequired
  }

  static panelSettings = {
    activePanelType: 'userEdit',
    breadcrumbs: [
      {
        label: 'Users',
        type: 'users',
        link: '/admin/users'
      }
    ]
  }

  render () {
    return (
      <UserEdit
        {...this.props}
        {...this.state}
      />
    );
  }
}
