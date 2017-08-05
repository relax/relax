import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './icon.less';

export default class Icon extends Component {
  static propTypes = {
    className: PropTypes.string,
    selected: PropTypes.bool,
    icon: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired
  };

  @bind
  onClick () {
    const {onClick, icon} = this.props;
    onClick(icon);
  }

  render () {
    const {className, children, icon, selected, onDoubleClick} = this.props;

    return (
      <div
        className={cx(styles.root, selected && styles.selected)}
        onClick={this.onClick}
        onDoubleClick={onDoubleClick}
      >
        <i className={className}>{children}</i>
        <div className={styles.label}>{icon}</div>
      </div>
    );
  }
}
