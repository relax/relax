import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './collapsable.less';

export default class Collapsable extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    defaultOpened: PropTypes.bool.isRequired
  };

  static defaultProps = {
    defaultOpened: true
  };

  getInitState () {
    return {
      opened: this.props.defaultOpened
    };
  }

  @bind
  onClick () {
    this.setState({
      opened: !this.state.opened
    });
  }

  render () {
    const {opened} = this.state;
    const {title, icon} = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.header} onClick={this.onClick}>
          <i className={cx(styles.icon, icon)} />
          <span className={styles.title}>
            {title}
          </span>
          <i className={cx(
              styles.headerIcon,
              'nc-icon-mini', opened ? 'arrows-1_minimal-up' : 'arrows-1_minimal-down'
            )}
          />
        </div>
        {opened && this.props.children}
      </div>
    );
  }
}
