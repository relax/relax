import React from 'react';
import {Component} from 'relax-framework';
import {Types} from '../../data-types';

export default class Login extends Component {

  onSubmit (event) {
    event.preventDefault();
    React.findDOMNode(this.refs.form).submit();
  }

  render () {
    return (
      <div className='page-init white-options'>
        <h1>Login</h1>
        <form action='/admin/login' method='post' ref='form'>
          <div className='option'>
            <div className='label'>Username</div>
            <div className='input'>
              <input type='text' name='username' placeholder='Enter Username' />
            </div>
          </div>
          <div className='option'>
            <div className='label'>Password</div>
            <div className='input'>
              <input type='password' name='password' placeholder='Password' />
            </div>
          </div>
          <a className='button button-primary full' href='#' onClick={this.onSubmit.bind(this)}>Login</a>
          <input type='submit' hidden='true' />
        </form>
      </div>
    );
  }
}

Login.options = [
  {
    label: 'Username',
    type: Types.String,
    id: 'username',
    default: ''
  },
  {
    label: 'Password',
    type: Types.String,
    id: 'password',
    default: ''
  }
];
