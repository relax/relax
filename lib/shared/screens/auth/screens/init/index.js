import Component from 'components/component';
import React, {PropTypes} from 'react';
import {addUser} from 'actions/users';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import AdminInit from './components/init';

@connect(
  () => ({}),
  (dispatch) => bindActionCreators({addUser}, dispatch)
)
export default class Init extends Component {
  static propTypes = {
    addUser: PropTypes.func.isRequired
  };

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
        users: {
          _id: 1
        }
      }, {
        ...this.state.user
      })
      .then(() => {
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
