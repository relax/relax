import React from 'react';
import {Link} from 'react-router';
import {Component} from 'relax-framework';

export default class A extends Component {
  onClick (event) {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (this.props.afterClick) {
      this.props.afterClick(event);
    }
  }

  render () {
    return (
      <Link to={this.props.href} {...this.props} onClick={::this.onClick}>
        {this.props.children}
      </Link>
    );
  }
}
