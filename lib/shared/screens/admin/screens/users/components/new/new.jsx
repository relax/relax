import Component from 'components/component';
import ModalInput from 'components/modal-input';
import ModalNew from 'components/modal-new';
import React from 'react';
import PropTypes from 'prop-types';
import bind from 'decorators/bind';

export default class NewUser extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    changeField: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    loading: PropTypes.bool
  };

  @bind
  changeUsername (value) {
    this.props.changeField('username', value);
  }

  @bind
  changePassword (value) {
    this.props.changeField('password', value);
  }

  @bind
  changeName (value) {
    this.props.changeField('name', value);
  }

  @bind
  changeEmail (value) {
    this.props.changeField('email', value);
  }

  render () {
    const {username, password, name, email, submit, loading} = this.props;
    return (
      <ModalNew submit={submit} loading={loading}>
        <ModalInput
          focus
          value={username}
          placeholder='Username'
          onChange={this.changeUsername}
        />
        <ModalInput
          focus
          value={password}
          type='password'
          placeholder='Password'
          onChange={this.changePassword}
        />
        <ModalInput
          focus
          value={name}
          placeholder='Name'
          onChange={this.changeName}
        />
        <ModalInput
          focus
          value={email}
          placeholder='Email'
          onChange={this.changeEmail}
        />
      </ModalNew>
    );
  }
}
