import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import OptionsList from '../options-list';
import {Types} from '../../data-types';

export default class Init extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    user: PropTypes.object,
    error: PropTypes.string
  }

  static options = [
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
    },
    {
      label: 'Name',
      type: Types.String,
      id: 'name',
      default: ''
    },
    {
      label: 'Email',
      type: Types.String,
      id: 'email',
      default: ''
    }
  ]

  onChange (id, event) {
    this.props.onChange(id, event.target.value);
  }

  render () {
    const {username, password, name, email} = this.props.user;

    return (
      <div className='page-init white-options'>
        <div className='logo'>
          <img src='/images/admin/logo_big.png' width='150' />
          <div className='version'>beta</div>
        </div>
        <h1>Welcome to Relax!</h1>
        <h3>Register the first user to start building your website in a breeze.</h3>
        <form onSubmit={this.props.onSubmit}>
          <label>
            <i className='material-icons'>person_outline</i>
            <input type='text' name='username' placeholder='Username' value={username} onChange={this.onChange.bind(this, 'username')} />
          </label>
          <label>
            <i className='material-icons'>lock_outline</i>
            <input type='password' name='password' placeholder='Password' value={password} onChange={this.onChange.bind(this, 'password')} />
          </label>
          <label>
            <i className='material-icons smaller'>face</i>
            <input type='text' name='name' placeholder='Name' value={name} onChange={this.onChange.bind(this, 'name')} />
          </label>
          <label>
            <i className='material-icons smaller'>email</i>
            <input type='text' name='email' placeholder='Email' value={email} onChange={this.onChange.bind(this, 'email')} />
          </label>
          <a className='button button-primary full' href='#' onClick={this.props.onSubmit}>Let's get started</a>
          {<div className='error'>{this.props.error && this.props.error || ' '}</div>}
          <input type='submit' hidden />
        </form>
      </div>
    );
  }
}
