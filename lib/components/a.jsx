import React from 'react';
import {Component, Router} from 'relax-framework';

export default class A extends Component {
  onClick (event) {
    var url = this.props.href;
    if (url && url.charAt(0) === '/') {
      event.preventDefault();
      Router.prototype.navigate(url, {trigger: true});
    }

    if (this.props.afterClick) {
      this.props.afterClick();
    }
  }

  render () {
    return (
      <a {...this.props} onClick={this.onClick.bind(this)}>
        {this.props.children}
      </a>
    );
  }
}
