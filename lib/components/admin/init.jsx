import {post} from 'jquery';
import React from 'react';
import {Component, Router} from 'relax-framework';
import OptionsList from '../options-list';
import {Types} from '../../types';

import usersActions from '../../client/actions/user';

export default class Init extends Component {
  getInitialState () {
    return {
      user: {
        username: '',
        name: '',
        password: '',
        email: ''
      }
    };
  }

  onChange (id, value) {
    this.state.user[id] = value;
    this.setState({
      user: this.state.user
    });
  }

  onSubmit (event) {
    event.preventDefault();

    post('/admin/init', this.state.user)
      .done((data) => {
        Router.prototype.navigate('/admin/login', {trigger: true});
      })
      .fail((error) => {
        console.error(error);
      });
  }

  render () {
    return (
      <div className='page-init white-options'>
        <h1>Welcome <br/>to Relax</h1>
        <OptionsList options={this.constructor.options} values={this.state.user} onChange={this.onChange.bind(this)} />
        <a className='button button-primary full' href='#' onClick={this.onSubmit.bind(this)}>All done!</a>
      </div>
    );
  }
}

Init.options = [
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
];
