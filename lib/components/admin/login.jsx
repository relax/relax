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
        <h1>Login</h1>
        <form onSubmit={this.props.onSubmit}>
          <div className='option'>
            <div className='label'>Username</div>
            <div className='input'>
              <input type='text' name='username' placeholder='Enter Username' value={this.props.username} onChange={this.onChange.bind(this, 'username')} />
            </div>
          </div>
          <div className='option'>
            <div className='label'>Password</div>
            <div className='input'>
              <input type='password' name='password' placeholder='Password' value={this.props.password} onChange={this.onChange.bind(this, 'password')} />
            </div>
          </div>
          <a className='button button-primary full' href='#' onClick={this.props.onSubmit}>Login</a>
          {this.props.error && <div className='error'>{this.props.error}</div>}
          <input type='submit' hidden />
        </form>
      </div>
    );
  }
}
