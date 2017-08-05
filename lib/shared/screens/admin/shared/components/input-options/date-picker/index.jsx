import bind from 'decorators/bind';
import cx from 'classnames';
import moment from 'moment';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';
import Calendar from './calendar';

export default class DatePicker extends Component {
  static propTypes = {
    value: PropTypes.instanceOf(Date),
    before: PropTypes.instanceOf(Date),
    after: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired,
    format: PropTypes.string,
    white: PropTypes.bool
  };

  static defaultProps = {
    format: 'DD/MM/YYYY'
  };

  getInitState () {
    return {
      focused: false
    };
  }

  @bind
  onFocus () {
    this.setState({
      focused: true,
      opened: true,
      input: this.format(this.getValue())
    });
  }

  @bind
  onBlur () {
    this.setState({
      focused: false
    });
  }

  @bind
  onWrite (event) {
    const {format, onChange} = this.props;
    const newValue = event.target.value;

    // check if valid date
    const momentDate = moment(newValue, format);
    if (momentDate.isValid()) {
      onChange(momentDate.toDate());
    }

    this.setState({
      input: newValue
    });
  }

  @bind
  onClose () {
    this.setState({
      opened: false
    });
  }

  format (value) {
    const {format} = this.props;
    return moment(value).format(format);
  }

  getValue () {
    const {value} = this.props;
    let result;

    if (value instanceof Date) {
      result = value;
    } else {
      result = new Date();
    }

    return result;
  }

  render () {
    const {focused, input} = this.state;
    const {white} = this.props;
    const value = this.getValue();

    return (
      <div className={cx(styles.root, white && styles.white)} ref='holder'>
        <input
          type='text'
          className={styles.input}
          value={focused ? input : this.format(value)}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onWrite}
        />
        {this.renderCalendar(value)}
      </div>
    );
  }

  renderCalendar (value) {
    const {opened} = this.state;

    if (opened) {
      const {before, after, onChange, white} = this.props;

      return (
        <Calendar
          element={this.refs.holder}
          date={value}
          onClose={this.onClose}
          onChange={onChange}
          before={before}
          after={after}
          white={white}
        />
      );
    }
  }
}
