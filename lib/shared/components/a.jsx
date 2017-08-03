import bind from 'decorators/bind';
import qs from 'query-string';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

export default class A extends Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node,
    onClick: PropTypes.func,
    afterClick: PropTypes.func
  };

  @bind
  onClick (event) {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (this.props.afterClick) {
      this.props.afterClick(event);
    }
  }

  render () {
    const {href, ...tagProps} = this.props;
    const urlAndQuery = href && href.split('?');

    let url;
    let query;
    if (urlAndQuery) {
      url = urlAndQuery[0];
      query = qs.parse(urlAndQuery[1]);
    }

    return (
      <Link
        to={{
          pathname: url,
          query
        }}
        {...tagProps}
        onClick={this.onClick}
      >
        {this.props.children}
      </Link>
    );
  }
}
