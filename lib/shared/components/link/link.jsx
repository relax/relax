import Component from 'components/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

export default class LinkElem extends Component {
  static propTypes = {
    link: PropTypes.object,
    children: PropTypes.any
  };

  render () {
    const {link = {}, children, ...props} = this.props;
    const options = link.options || {};
    let result;

    switch (link.type) {
      case 'external':
        result = (
          <a href={options.url} {...props}>
            {children}
          </a>
        );
        break;
      case 'internal':
        result = (
          <Link to={options.url} {...props}>
            {children}
          </Link>
        );
        break;
      case 'anchor':
        result = (
          <a href={`#${options.anchor}`} {...props}>
            {children}
          </a>
        );
        break;
      default:
        result = (
          <a {...props}>
            {children}
          </a>
        );
    }

    return result;
  }
}
