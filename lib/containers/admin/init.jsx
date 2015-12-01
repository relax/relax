import * as usersActions from '../../client/actions/users';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import AdminInit from '../../components/admin/init';

@connect(
  (state) => ({}),
  (dispatch) => bindActionCreators(usersActions, dispatch)
)
export default class Init extends Component {
  static propTypes = {
    addUser: PropTypes.func.isRequired
  }

  getInitState () {
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

    this.props
      .addUser({
        user: {
          _id: 1
        }
      }, {
        ...this.state.user
      })
      .then(() => {
        // FIXME Route using router methods
        window.location = '/admin/login';
      })
      .done();
  }

  render () {
    return (
      <AdminInit
        {...this.props}
        {...this.state}
        onChange={::this.onChange}
        onSubmit={::this.onSubmit}
      />
    );
  }
}
