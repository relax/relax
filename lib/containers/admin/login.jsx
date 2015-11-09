import React from 'react';
import {Component} from 'relax-framework';

import Login from '../../components/admin/login';

export default class LoginContainer extends Component {
  onSubmit (event) {
    event.preventDefault();
    this.refs.login.refs.form.submit();
  }

  render () {
    return (
      <Login
        ref='login'
        {...this.props}
        {...this.state}
        onSubmit={::this.onSubmit}
      />
    );
  }
}
