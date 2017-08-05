import React from 'react';
import PropTypes from 'prop-types';
import Component from 'components/component';
import bind from 'decorators/bind';
import styles from './option.less';
import cx from 'classnames';

export default class Option extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    white: PropTypes.bool
  };

  @bind
  onClick () {
    const {onClick, value} = this.props;
    onClick(value);
  }

  render () {
    const {label, white} = this.props;

    return (
      <div
        className={cx(styles.root, white && styles.white)}
        onClick={this.onClick}
      >
        {label}
      </div>
    );
  }
}
