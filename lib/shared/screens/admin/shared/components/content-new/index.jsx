import React from 'react';
import PropTypes from 'prop-types';

import Component from 'components/component';
import {Link} from 'react-router';
import cx from 'classnames';
import styles from './index.less';

export default class ContentNew extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    url: PropTypes.string,
    remove: PropTypes.bool
  };

  render () {
    const {children, onClick, url, remove} = this.props;
    const className = cx(styles.button, remove && styles.remove);
    let result;

    if (onClick) {
      result = (
        <button className={className} onClick={onClick}>
          {children}
        </button>
      );
    } else {
      result = (
        <Link className={className} to={url}>
          {children}
        </Link>
      );
    }

    return result;
  }
}
