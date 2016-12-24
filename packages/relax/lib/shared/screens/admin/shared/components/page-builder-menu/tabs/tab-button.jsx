import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import Tooltip from 'components/tooltip';
import React, {PropTypes} from 'react';

import styles from './tab-button.less';

export default class TabButton extends Component {
  static propTypes = {
    tab: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    icon: PropTypes.string.isRequired,
    dataLinkable: PropTypes.bool.isRequired
  };

  @bind
  onClick () {
    const {onClick, tab} = this.props;
    onClick(tab);
  }

  render () {
    const {active, icon, tab, dataLinkable} = this.props;

    return (
      <Tooltip
        label={tab.toUpperCase()}
        className={cx(
          styles.root,
          active && styles.selected,
          dataLinkable && styles.dataLinkable,
          styles[tab]
        )}
      >
        <button className={styles.button} onClick={this.onClick}>
          <i className={icon} />
        </button>
      </Tooltip>
    );
  }
}
