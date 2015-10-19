import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import OptionsList from '../options-list';
import {Types} from '../../data-types';

export default class Init extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    user: PropTypes.object
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

  render () {
    return (
      <div className='page-init white-options'>
        <h1>Welcome <br/>to Relax</h1>
        <OptionsList options={this.constructor.options} values={this.props.user} onChange={this.props.onChange} />
        <a className='button button-primary full' href='#' onClick={this.props.onSubmit}>All done!</a>
      </div>
    );
  }
}
