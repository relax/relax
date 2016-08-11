import * as usersActions from 'actions/users';

import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import User from './components';

@dataConnect(
  (state) => ({
    userId: state.router.params.id,
    removeConfirm: state.user.removeConfirm,
    removing: state.user.removing,
    changingPassword: state.user.changingPassword,
    password: state.user.password,
    passwordConfirm: state.user.passwordConfirm
  }),
  (dispatch) => bindActionCreators(usersActions, dispatch),
  (props) => ({
    fragments: User.fragments,
    variablesTypes: {
      user: {
        id: 'ID!'
      }
    },
    initialVariables: {
      user: {
        id: props.userId
      }
    }
  })
)
export default class UserContainer extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    user: PropTypes.object,
    password: PropTypes.string,
    passwordConfirm: PropTypes.string,
    removeConfirm: PropTypes.bool.isRequired,
    removing: PropTypes.bool.isRequired,
    changingPassword: PropTypes.bool.isRequired,
    toggleRemoveUser: PropTypes.func.isRequired,
    toggleUserChangingPassword: PropTypes.func.isRequired,
    changeUserPasswordValue: PropTypes.func.isRequired,
    updateUserPassword: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired
  };

  @bind
  updateUserName (value) {
    const {userId, updateUserName} = this.props;
    return updateUserName(userId, value);
  }

  @bind
  updateUserUsername (value) {
    const {userId, updateUserUsername} = this.props;
    return updateUserUsername(userId, value);
  }

  @bind
  updateUserEmail (value) {
    const {userId, updateUserEmail} = this.props;
    return updateUserEmail(userId, value);
  }

  @bind
  removeUser () {
    const {userId, removeUser} = this.props;
    removeUser(userId, true);
  }

  @bind
  updateUserPassword () {
    const {userId, updateUserPassword, password, passwordConfirm} = this.props;

    if (password === passwordConfirm) {
      updateUserPassword(userId, password);
    }
  }

  render () {
    const {
      user,
      password,
      passwordConfirm,
      removeConfirm,
      removing,
      changingPassword,
      toggleRemoveUser,
      toggleUserChangingPassword,
      changeUserPasswordValue
    } = this.props;

    return (
      <User
        user={user}
        password={password}
        passwordConfirm={passwordConfirm}
        removeConfirm={removeConfirm}
        removing={removing}
        changingPassword={changingPassword}
        toggleRemove={toggleRemoveUser}
        togglePassword={toggleUserChangingPassword}
        changePasswordValue={changeUserPasswordValue}
        removeUser={this.removeUser}
        updateUserPassword={this.updateUserPassword}
        updateUserName={this.updateUserName}
        updateUserUsername={this.updateUserUsername}
        updateUserEmail={this.updateUserEmail}
      />
    );
  }
}
