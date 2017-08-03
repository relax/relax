import Component from 'components/component';
import Tooltip from 'components/tooltip';
import bind from 'decorators/bind';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './type.less';

export default class LinkType extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool,
    white: PropTypes.bool,
    small: PropTypes.bool
  };

  @bind
  onClick () {
    const {onClick, type} = this.props;
    onClick(type);
  }

  render () {
    const {icon, active, label, white, small} = this.props;

    return (
      <Tooltip
        className={cx(
          styles.root,
          active && styles.active,
          white && styles.white,
          small && styles.small
        )}
        onClick={this.onClick}
        label={label}
      >
        <i className={icon} />
      </Tooltip>
    );
  }
}
