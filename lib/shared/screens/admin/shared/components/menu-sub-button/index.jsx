import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import styles from './index.less';

export default class MenuSubButton extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    active: PropTypes.bool,
    query: PropTypes.object
  };

  static defaultProps = {
    active: false
  };

  render () {
    const {link, label, active, query} = this.props;
    return (
      <Link
        to={link}
        query={query}
        className={cx(styles.button, active && styles.active)}
      >
        {label}
      </Link>
    );
  }
}
