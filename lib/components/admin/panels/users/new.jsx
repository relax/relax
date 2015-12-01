import React from 'react';
import {Component} from 'relax-framework';
import OptionsList from '../../../options-list';
import {Types} from '../../../../data-types';

const options = [
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
    default: '',
    props: {
      password: true
    }
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

export default class New extends Component {
  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired
  }

  getInitState () {
    return {
      username: '',
      password: '',
      name: '',
      email: ''
    };
  }

  onChange (id, value) {
    this.setState({
      [id]: value
    });
  }

  onSubmit (event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  render () {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <OptionsList options={options} values={this.state} onChange={this.onChange.bind(this)} />
        <input type='submit' hidden />
        <a className='button button-primary' href='#' onClick={this.onSubmit.bind(this)}>Add user</a>
      </form>
    );
  }
}
