import qs from 'query-string';
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
    const urlAndQuery = this.props.href && this.props.href.split('?');

    var url;
    var query;

    if (urlAndQuery) {
      url = urlAndQuery[0];
      query = qs.parse(urlAndQuery[1]);
    }

    return (
      <Link to={url} query={query} {...this.props} onClick={::this.onClick}>
        {this.props.children}
      </Link>
    );
  }
}
