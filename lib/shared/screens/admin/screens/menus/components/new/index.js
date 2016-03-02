import Component from 'components/component';
import React, {PropTypes} from 'react';
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

  changeTitle (title) {
    this.setState({
      title
    });
  }

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
        changeTitle={::this.changeTitle}
        submit={::this.submit}
      />
    );
  }
}
