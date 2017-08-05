import bind from 'decorators/bind';
import moment from 'moment';
import Balloon from 'components/balloon';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './calendar.less';
import Day from './day';

export default class Calendar extends Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    before: PropTypes.instanceOf(Date),
    after: PropTypes.instanceOf(Date),
    element: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    white: PropTypes.bool
  };

  getInitState () {
    const {date} = this.props;
    const dt = moment(date);
    const currentDate = moment({
      year: dt.year(),
      month: dt.month(),
      day: 1
    });

    return {
      currentDate
    };
  }

  @bind
  next () {
    const {currentDate} = this.state;
    this.setState({
      currentDate: moment(currentDate).add(1, 'M')
    });
  }

  @bind
  previous () {
    const {currentDate} = this.state;
    this.setState({
      currentDate: moment(currentDate).subtract(1, 'M')
    });
  }

  sameMonthAndYear (date, date1) {
    return date.month() === date1.month() && date.year() === date1.year();
  }

  dateMatches (date, date1, day) {
    const selectedDay = date1.date();
    return this.sameMonthAndYear(date, date1) && day === selectedDay;
  }

  isActive (day) {
    let active = 0;
    const {date, before, after} = this.props;
    const {currentDate} = this.state;
    const selectedDate = moment(date);

    if (this.dateMatches(currentDate, selectedDate, day)) {
      active = 2;
    } else if (before || after) {
      const other = before || after;
      const otherDate = moment(other);

      if (this.dateMatches(currentDate, otherDate, day)) {
        active = 1;
      } else {
        const currentItDate = moment(currentDate).date(day);
        active = (currentItDate.isBetween(otherDate, selectedDate) ||
                  currentItDate.isBetween(selectedDate, otherDate)) ? 1 : 0;
      }
    }

    return active;
  }

  render () {
    const {element, onClose, white} = this.props;
    const {currentDate} = this.state;

    return (
      <Balloon
        element={element}
        white={white}
        stickOptions={{verticalPosition: 'bottom', horizontalPosition: 'center', horizontalOffset: 0, onClose}}
        unpadded
        small
      >
        <div className={styles.root}>
          <div className={styles.month}>
            <i className='nc-icon-mini arrows-1_small-triangle-left' onClick={this.previous} />
            <span>
              {currentDate.format('MMM YYYY')}
            </span>
            <i className='nc-icon-mini arrows-1_small-triangle-right' onClick={this.next} />
          </div>
          {this.renderDays()}
        </div>
      </Balloon>
    );
  }

  renderDays () {
    const {currentDate} = this.state;
    const numberDays = currentDate.daysInMonth();
    const weekDay = currentDate.isoWeekday(); // 1 (Monday) - 7 (Sunday)

    const rows = [];
    let row = new Array(weekDay).join('0').split('').map(parseFloat);

    let currentWeekDay = weekDay;
    for (let i = 1; i <= numberDays; i++) {
      row.push({
        day: i,
        active: this.isActive(i)
      });

      currentWeekDay ++;
      if (currentWeekDay > 7) {
        rows.push(row);
        row = [];
        currentWeekDay = 1;
      }
    }
    if (row.length) {
      rows.push(row);
    }

    return (
      <table className={styles.table}>
        <tbody>
          {this.renderWeekDays()}
          {rows.map(this.renderRow, this)}
        </tbody>
      </table>
    );
  }

  renderRow (row) {
    return (
      <tr className={styles.row}>
        {row.map(this.renderCell, this)}
      </tr>
    );
  }

  renderCell (day) {
    let result;

    if (day) {
      const {onChange} = this.props;
      const {currentDate} = this.state;
      const dayDate = moment(currentDate).date(day.day).toDate();

      result = (
        <Day
          day={day.day}
          active={day.active}
          onChange={onChange}
          date={dayDate}
        />
      );
    } else {
      result = <td></td>;
    }

    return result;
  }

  renderWeekDays () {
    return (
      <tr className={styles.header}>
        <th>Mo</th>
        <th>Tu</th>
        <th>We</th>
        <th>Th</th>
        <th>Fr</th>
        <th>Sa</th>
        <th>Su</th>
      </tr>
    );
  }
}
