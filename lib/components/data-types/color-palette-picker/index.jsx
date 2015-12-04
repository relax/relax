import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Edit from './edit';
import {getColorString} from '../../../helpers/colors';

export default class ColorPicker extends Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    toggleOpened: PropTypes.func.isRequired,
    className: PropTypes.string,
    colr: PropTypes.object.isRequired,
    opacity: PropTypes.number.isRequired,
    colors: PropTypes.array.isRequired,
    opened: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired
  }

  toggleOpen (event) {
    event.preventDefault();
    this.props.toggleOpened();
  }

  render () {
    const {colr, colors, opacity, label} = this.props;
    const colorString = getColorString({
      colr: colr,
      opacity: opacity
    }, colors);
    const colorStyle = {
      backgroundColor: colorString
    };

    return (
      <div className={cx('color-picker', this.props.className)}>
        <div className='color-picker-info' onClick={::this.toggleOpen}>
          <div className='color-preview'>
            <span style={colorStyle} />
          </div>
          <span>{label}</span>
        </div>
        {this.renderContent()}
      </div>
    );
  }

  renderContent () {
    if (this.props.opened) {
      return (
        <Edit {...this.props} />
      );
    }
  }
}
