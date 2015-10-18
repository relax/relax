import React from 'react';
import {Link} from 'react-router';
import {Component} from 'relax-framework';

export default class A extends Component {
  onClick (event) {
    if (this.props.afterClick) {
      this.props.afterClick();
    }
  }

  render () {
    return (
      <Link to={this.props.href} {...this.props} onClick={this.onClick.bind(this)}>
        {this.props.children}
      </Link>
    );
  }
}
