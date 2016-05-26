import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import Portal from 'components/portal';
import Stick from 'components/stick';
import React, {PropTypes} from 'react';
import {applyBackground} from 'helpers/colors';

import styles from './color-palette-picker.less';
import Edit from './edit';

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
    type: PropTypes.string.isRequired,
    white: PropTypes.bool
  };

  @bind
  toggleOpen (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.toggleOpened();
  }

  render () {
    const {colors, value, type, white} = this.props;
    const colorStyle = {};
    applyBackground(colorStyle, value, colors);

    let label = this.props.label;
    if (type === 'linear') {
      label = 'Linear Grad.';
    } else if (type === 'radial') {
      label = 'Radial Grad.';
    }

    return (
      <div className={cx(white && styles.white, this.props.className)}>
        <div className={styles.info} onClick={this.toggleOpen} ref={(ref) => {this.ref = ref;}}>
          <div className={styles.preview}>
            <span className={styles.color} style={colorStyle} />
          </div>
          <span className={styles.label}>{label}</span>
        </div>
        {this.renderContent()}
      </div>
    );
  }

  renderContent () {
    if (this.props.opened) {
      return (
        <Portal>
          <Stick
            element={this.ref}
            verticalPosition='bottom'
            horizontalPosition='left'
            transition='slideUpIn'
            horizontalOffset={-9}
          >
            <Edit {...this.props} infoElement={this.ref} />
          </Stick>
        </Portal>
      );
    }
  }
}
