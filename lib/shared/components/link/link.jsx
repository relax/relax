import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

export default class LinkElem extends Component {
  static propTypes = {
    link: PropTypes.object,
    children: PropTypes.any,
    item: PropTypes.object,
    editing: PropTypes.bool
  };

  render () {
    const {link = {}, item, editing, children, ...props} = this.props;
    const options = link.options || {};
    let result;

    switch (editing ? '' : link.type) {
      case 'external':
        result = (
          <a href={options.url} {...props}>
            {children}
          </a>
        );
        break;
      case 'internal':
        if (item && item.slug) {
          result = (
            <Link to={`/${item.slug}`} {...props}>
              {children}
            </Link>
          );
        } else {
          result = (
            <a href='#' {...props}>
              {children}
            </a>
          );
        }

        break;
      case 'anchor':
        result = (
          <a href={`#${options.anchor}`} {...props}>
            {children}
          </a>
        );
        break;
      case 'form':
        result = (
          <button {...props}>
            {children}
          </button>
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
