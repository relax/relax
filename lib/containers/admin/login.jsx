import request from 'superagent';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Login from '../../components/admin/login';

export default class LoginContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  getInitState () {
    return {
      username: '',
      password: ''
    };
  }

  onSubmit (event) {
    event.preventDefault();
    const {username, password} = this.state;

    request
      .post('/admin/login')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({username, password})
      .end((error, res) => {
        if (error) {
          this.setState({
            error: res.body.message
          });
        } else {
          window.location.href = '/admin';
        }
      });
  }

  fieldChange (id, value) {
    this.setState({
      [id]: value
    });
  }

  render () {
    return (
      <Login
        ref='login'
        {...this.props}
        {...this.state}
        onSubmit={::this.onSubmit}
        fieldChange={::this.fieldChange}
      />
    );
  }
}
