import React from 'react';
import PropTypes from 'prop-types';

import Component from 'components/component';
import moment from 'moment';

export default class DatePresentation extends Component {
  static propTypes = {
    value: PropTypes.string
  };

  render () {
    const {value} = this.props;
    let date = 'No date selected';

    if (value) {
      const momentDate = moment(value);
      date = momentDate.format('MMMM Do YYYY');
    }

    return (
      <div>
        {date}
      </div>
    );
  }
}
