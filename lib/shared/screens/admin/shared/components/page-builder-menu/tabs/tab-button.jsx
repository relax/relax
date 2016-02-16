import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './tab-button.less';

export default class TabButton extends Component {
  static propTypes = {
    tab: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
  };

  onClick () {
    const {onClick, tab} = this.props;
    onClick(tab);
  }

  render () {
    const {tab, active} = this.props;
    return (
      <button className={cx(styles.root, active && styles.selected)} onClick={::this.onClick}>
        {tab}
      </button>
    );
  }
}
