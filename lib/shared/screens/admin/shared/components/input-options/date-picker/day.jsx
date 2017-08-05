import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './day.less';

export default class DatePicker extends Component {
  static propTypes = {
    active: PropTypes.number,
    day: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    date: PropTypes.instanceOf(Date)
  };

  @bind
  onClick () {
    const {onChange, date} = this.props;
    onChange(date);
  }

  render () {
    const {day, active} = this.props;

    return (
      <td className={cx(styles.root, active && styles[`active${active}`])} onClick={this.onClick}>
        <span>{day}</span>
      </td>
    );
  }
}
