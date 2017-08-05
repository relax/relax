import bind from 'decorators/bind';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {addMenu} from 'actions/menu';

import New from './new';

export default class NewMenuContainer extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  getInitState () {
    return {
      title: '',
      loading: false
    };
  }

  @bind
  changeTitle (title) {
    this.setState({
      title
    });
  }

  @bind
  submit () {
    if (!this.state.loading) {
      this.setState({
        loading: true
      }, () => {
        const {store} = this.context;
        const {onClose} = this.props;
        const {title} = this.state;
        store.dispatch(addMenu({title}, true)).then(() => {
          onClose && onClose();
        });
      });
    }
  }

  render () {
    return (
      <New
        {...this.state}
        changeTitle={this.changeTitle}
        submit={this.submit}
      />
    );
  }
}
