import cx from 'classnames';
import A from 'components/a';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class MenuSubButton extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    active: PropTypes.bool
  };

  static defaultProps = {
    active: false
  };

  render () {
    const {link, label, active} = this.props;
    return (
      <A
        href={link}
        className={cx(styles.button, active && styles.active)}
      >
        {label}
      </A>
    );
  }
}
