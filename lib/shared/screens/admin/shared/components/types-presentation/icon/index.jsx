import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

export default class IconPresentation extends Component {
  static propTypes = {
    value: PropTypes.bool
  };

  render () {
    const {value} = this.props;
    let result;

    if (value) {
      result = (
        <i className={value.className}>{value.content}</i>
      );
    } else {
      result = (
        <div>-</div>
      );
    }

    return result;
  }
}
