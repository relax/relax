import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Edit from './edit';
import Portal from '../../portal';
import Stick from '../../stick';
import {applyBackground} from '../../../helpers/colors';

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
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }

  toggleOpen (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.toggleOpened();
  }

  render () {
    const {colors, value, type} = this.props;
    const colorStyle = {};
    applyBackground(colorStyle, value, colors);

    let label = this.props.label;
    if (type === 'linear') {
      label = 'Linear Grad.';
    } else if (type === 'radial') {
      label = 'Radial Grad.';
    }

    return (
      <div className={cx('color-picker', this.props.className)}>
        <div className='color-picker-info' onClick={::this.toggleOpen} ref={(ref) => this.ref = ref}>
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
        <Portal>
          <Stick element={this.ref} verticalPosition='bottom' horizontalPosition='left' transition='slideUpIn' horizontalOffset={-9}>
            <Edit {...this.props} infoElement={this.ref} />
          </Stick>
        </Portal>
      );
    }
  }
}
