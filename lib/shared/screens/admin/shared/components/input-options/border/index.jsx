import cx from 'classnames';
import BorderStyle from 'components/input-options/border-style';
import ColorPicker from 'components/input-options/color';
import Component from 'components/component';
import NumberInput from 'components/input-options/number';
import React from 'react';

import styles from './index.less';

export default class BorderPicker extends Component {
  static propTypes = {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired
  };

  getInitState () {
    this.onWidhtChange = this.onInputChange.bind(this, 'width');
    this.onColorChange = this.onInputChange.bind(this, 'color');
    this.onStyleChange = this.onInputChange.bind(this, 'style');

    return {
      selected: 'center',
      values: this.parseValue(this.props.value)
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      values: this.parseValue(nextProps.value)
    });
  }

  onInputChange (id, value) {
    if (this.state.selected === 'center') {
      this.state.values.top[id] = value;
      this.state.values.right = Object.assign({}, this.state.values.top);
      this.state.values.bottom = Object.assign({}, this.state.values.top);
      this.state.values.left = Object.assign({}, this.state.values.top);
      this.state.values.equal = true;
    } else {
      this.state.values[this.state.selected][id] = value;
    }
    this.props.onChange(Object.assign({}, this.state.values));
  }

  parseValue (value) {
    const result = {
      top: {
        style: 'solid',
        width: 1,
        color: {
          value: '#000000',
          opacity: 100
        }
      },
      left: {
        style: 'solid',
        width: 1,
        color: {
          value: '#000000',
          opacity: 100
        }
      },
      right: {
        style: 'solid',
        width: 1,
        color: {
          value: '#000000',
          opacity: 100
        }
      },
      bottom: {
        style: 'solid',
        width: 1,
        color: {
          value: '#000000',
          opacity: 100
        }
      },
      equal: false
    };

    if (value) {
      result.top = value.top || result.top;
      result.left = value.left || result.left;
      result.right = value.right || result.right;
      result.bottom = value.bottom || result.bottom;
    }

    if (this.equal(result.top, result.right) &&
        this.equal(result.top, result.bottom) &&
        this.equal(result.top, result.left)) {
      result.equal = true;
    } else {
      result.equal = false;
    }

    return result;
  }

  equal (comp1, comp2) {
    return (
      comp1.style === comp2.style &&
      comp1.width === comp2.width &&
      comp1.color.value === comp2.color.value &&
      comp1.color.opacity === comp2.color.opacity
    );
  }

  changeSelected (selected, event) {
    event.preventDefault();
    this.setState({
      selected
    });
  }

  render () {
    const values = this.state.values;
    let value = 0;
    let inactive = false;

    if (this.state.selected !== 'center') {
      value = values[this.state.selected];
    } else {
      inactive = !values.equal;
      value = values.top;

      if (inactive) {
        value.style = 'solid';
      }
    }

    return (
      <div>
        <div className={styles.toggles}>
          {this.renderToggleButton('top', !values.equal)}
          {this.renderToggleButton('left', !values.equal)}
          {this.renderToggleButton('right', !values.equal)}
          {this.renderToggleButton('bottom', !values.equal)}
          {this.renderToggleButton('center', values.equal)}
        </div>
        <NumberInput
          className={styles.option}
          small
          value={value.width}
          onChange={this.onWidhtChange}
          inactive={inactive}
        />
        <ColorPicker
          className={cx(styles.option, styles.colorPicker)}
          value={value.color}
          onChange={this.onColorChange}
          side='right'
        />
        <BorderStyle
          className={styles.borderStyle}
          value={value.style}
          onChange={this.onStyleChange}
        />
      </div>
    );
  }

  renderToggleButton (pos, active) {
    const changeSelected = this.changeSelected.bind(this, pos);
    return (
      <div
        className={cx(
          styles.toggle,
          styles[pos],
          this.state.selected === pos && styles.selected,
          active && styles.active
        )}
        onClick={changeSelected}
      />
    );
  }
}
