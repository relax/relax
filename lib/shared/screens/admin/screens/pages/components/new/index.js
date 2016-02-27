import Component from 'components/component';
import React, {PropTypes} from 'react';
import {addPage} from 'actions/page';

import New from './new';

export default class NewPageContainer extends Component {
  static propTypes = {
    fragments: PropTypes.object.isRequired,
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
        const {fragments, onClose} = this.props;
        const {title} = this.state;
        store.dispatch(addPage(fragments.pages, {title}, true)).then(() => {
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
