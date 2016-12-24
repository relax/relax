import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {addPage} from 'actions/page';

import New from './new';

export default class NewPageContainer extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    redirectBuild: PropTypes.bool
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
        const {onClose, redirectBuild} = this.props;
        const {title} = this.state;
        store.dispatch(addPage({title}, true, redirectBuild)).then(() => {
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
