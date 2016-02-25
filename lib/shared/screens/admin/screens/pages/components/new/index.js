import Component from 'components/component';
import React from 'react';

import New from './new';

export default class NewPageContainer extends Component {
  getInitState () {
    return {
      title: ''
    };
  }

  changeTitle (title) {
    this.setState({
      title
    });
  }

  render () {
    return (
      <New
        {...this.props}
        changeTitle={::this.changeTitle}
      />
    );
  }
}
