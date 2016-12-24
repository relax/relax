import bind from 'decorators/bind';
import Component from 'components/component';
import React from 'react';

import LinkBuilder from './link';

export default class LinkContainer extends Component {
  getInitState () {
    return {
      label: '',
      url: ''
    };
  }

  @bind
  changeLabel (label) {
    this.setState({
      label
    });
  }

  @bind
  changeUrl (url) {
    this.setState({
      url
    });
  }

  render () {
    return (
      <LinkBuilder
        changeLabel={this.changeLabel}
        changeUrl={this.changeUrl}
        {...this.state}
      />
    );
  }
}
