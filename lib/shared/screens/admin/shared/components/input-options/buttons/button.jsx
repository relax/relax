import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import Tooltip from 'components/tooltip';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './button.less';

export default class ButtonsOptionButton extends Component {
  static propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    vertical: PropTypes.bool,
    white: PropTypes.bool,
    selected: PropTypes.bool,
    tooltip: PropTypes.string,
    total: PropTypes.number
  };

  @bind
  onClick () {
    const {onClick, index} = this.props;
    onClick(index);
  }

  render () {
    const {vertical, children, white, selected, tooltip, total} = this.props;
    const className = cx(
      styles.root,
      selected && styles.active,
      vertical && styles.vertical || styles.horizontal,
      white && styles.white
    );
    let result;

    const style = {};
    if (!vertical) {
      style.width = `${100 / total}%`;
    }

    if (tooltip) {
      result = (
        <Tooltip label={tooltip} className={className} style={style}>
          <div onClick={this.onClick}>
            {this.props.children}
          </div>
        </Tooltip>
      );
    } else {
      result = (
        <div
          className={className}
          onClick={this.onClick}
          style={style}
        >
          {children}
        </div>
      );
    }

    return result;
  }
}
