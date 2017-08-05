import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {getColorString} from 'helpers/styles/colors';

export default class ColorPresentation extends Component {
  static propTypes = {
    value: PropTypes.bool
  };

  render () {
    const {value} = this.props;
    let result;

    if (value) {
      const color = getColorString(value);
      const style = {
        backgroundColor: color
      };
      result = (
        <div style={style} />
      );
    } else {
      result = (
        <div>-</div>
      );
    }

    return result;
  }
}
