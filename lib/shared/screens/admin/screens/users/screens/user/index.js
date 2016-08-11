import * as usersActions from 'actions/users';

import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import User from './components';

@dataConnect(
  (state) => ({
    userId: state.router.params.id
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
    userId: PropTypes.string.isRequired
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

  render () {
    const {user} = this.props;

    return (
      <User
        user={user}
        updateUserName={this.updateUserName}
        updateUserUsername={this.updateUserUsername}
        updateUserEmail={this.updateUserEmail}
      />
    );
  }
}
