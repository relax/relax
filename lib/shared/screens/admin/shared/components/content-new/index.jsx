import Component from 'components/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import styles from './index.less';

export default class ContentNew extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    url: PropTypes.string
  };

  render () {
    const {children, onClick, url} = this.props;
    let result;

    if (onClick) {
      result = (
        <button className={styles.button} onClick={onClick}>
          {children}
        </button>
      );
    } else {
      result = (
        <Link className={styles.button} to={url}>
          {children}
        </Link>
      );
    }

    return result;
  }
}
