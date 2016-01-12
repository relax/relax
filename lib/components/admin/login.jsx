import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

export default class Login extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    fieldChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    error: PropTypes.string
  }

  onChange (id, event) {
    this.props.fieldChange(id, event.target.value);
  }

  render () {
    return (
      <div className='page-init white-options'>
        <div className='logo'>
          <img src='/images/admin/logo_big.png' width='150' />
          <div className='version'>beta</div>
        </div>
        <h1>Welcome back!</h1>
        <h3>Login with your account below to get started</h3>
        <form onSubmit={this.props.onSubmit}>
          <label>
            <i className='material-icons'>person_outline</i>
            <input type='text' name='username' placeholder='Username' value={this.props.username} onChange={this.onChange.bind(this, 'username')} />
          </label>
          <label>
            <i className='material-icons'>lock_outline</i>
            <input type='password' name='password' placeholder='Password' value={this.props.password} onChange={this.onChange.bind(this, 'password')} />
          </label>
          <a className='button button-primary full' href='#' onClick={this.props.onSubmit}>Let's get started</a>
          {<div className='error'>{this.props.error && this.props.error || ' '}</div>}
          <input type='submit' hidden />
        </form>
      </div>
    );
  }
}
