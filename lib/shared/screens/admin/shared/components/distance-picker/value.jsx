import bind from 'decorators/bind';
import cx from 'classnames';
import Balloon from 'components/balloon';
import Button from 'components/button';
import Component from 'components/component';
import NumberInput from 'components/input-options/number';
import React, {PropTypes} from 'react';
import {lengthUnits} from 'helpers/units';

import styles from './value.less';

export default class DistancePicker extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    property: PropTypes.string.isRequired,
    inside: PropTypes.bool,
    label: PropTypes.string
  };

  static defaultProps = {
    value: 'auto'
  };

  getNumberValue () {
    const {value} = this.props;
    let result;

    if (value === 'auto' || !value) {
      result = 0;
    } else {
      result = parseInt(value, 10);
    }

    return result;
  }

  getValueUnit () {
    const {value} = this.props;
    let result;

    if (value === 'auto' || !value) {
      result = 'px';
    } else {
      result = value.replace(/(-|\d)+/ig, '');
    }

    return result;
  }

  @bind
  onMouseDown (event) {
    event.preventDefault();
    event.stopPropagation();

    this.iniX = event.pageX;
    this.iniY = event.pageY;
    this.iniValue = this.getNumberValue();
    this.iniUnit = this.getValueUnit();

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  @bind
  onMouseUp (event) {
    event.preventDefault();
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  @bind
  onMouseMove (event) {
    event.preventDefault();
    const {onChange, property, value} = this.props;
    const factor = 2;
    let result;

    if (property === 'top' || property === 'bottom') {
      // vertical movement
      const diff = this.iniY - event.pageY;

      if (property === 'top') {
        result = this.iniValue + Math.round(diff / factor);
      } else {
        result = this.iniValue - Math.round(diff / factor);
      }
    } else {
      // horizontal movement
      const diff = this.iniX - event.pageX;

      if (property === 'left') {
        result = this.iniValue + Math.round(diff / factor);
      } else {
        result = this.iniValue - Math.round(diff / factor);
      }
    }

    const final = `${result}${this.iniUnit}`;

    if (value !== final) {
      onChange(property, final);
    }
  }

  @bind
  toggleValue () {
    this.setState({
      opened: !this.state.opened
    });
  }

  @bind
  onValueChange (value) {
    const {onChange, property} = this.props;
    onChange(property, value);
  }

  @bind
  toAuto () {
    const {onChange, property} = this.props;
    onChange(property, 'auto');
  }

  render () {
    const {property, value, inside, label} = this.props;

    return (
      <div className={cx(styles.root, styles[property], inside && styles.inside)}>
        <div
          className={styles.value}
          ref={(ref) => {this.valueRef = ref;}}
          onClick={this.toggleValue}
        >
          {value}
        </div>
        <div
          className={styles.dragger}
          onMouseDown={this.onMouseDown}
        >
          {label}
        </div>
        {this.renderBalloon()}
      </div>
    );
  }

  renderBalloon () {
    if (this.state.opened) {
      const {value} = this.props;

      return (
        <Balloon
          element={this.valueRef}
          className={styles.balloon}
          white
          small
          stickOptions={{
            horizontalPosition: 'center',
            horizontalOffset: 0,
            verticalOffset: 9,
            onClose: this.toggleValue
          }}
        >
          <NumberInput
            value={value}
            onChange={this.onValueChange}
            className={styles.input}
            allowed={lengthUnits}
            min={false}
            white
            small
            focused
          />
          <Button
            small
            primary
            noBackground
            bordered
            thin
            className={styles.auto}
            onClick={this.toAuto}
          >
            Auto
          </Button>
        </Balloon>
      );
    }
  }
}
