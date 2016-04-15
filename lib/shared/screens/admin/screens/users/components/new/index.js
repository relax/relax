import Component from 'components/component';
import React, {PropTypes} from 'react';
import {addUser} from 'actions/users';

import New from './new';

export default class NewUserContainer extends Component {
  static propTypes = {
    fragments: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  getInitState () {
    return {
      username: '',
      password: '',
      email: '',
      name: '',
      loading: false
    };
  }

  submit () {
    if (!this.state.loading) {
      this.setState({
        loading: true
      }, () => {
        const {store} = this.context;
        const {fragments, onClose} = this.props;
        const {username, password, email, name} = this.state;
        store.dispatch(addUser(fragments, {username, password, email, name}, true)).then(() => {
          onClose && onClose();
        });
      });
    }
  }

  changeField (field, value) {
    this.setState({
      [field]: value
    });
  }

  render () {
    return (
      <New
        {...this.state}
        submit={::this.submit}
        changeField={::this.changeField}
      />
    );
  }
}
