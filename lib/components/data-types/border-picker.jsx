import cx from 'classnames';
import React from 'react';
import {Component} from 'relax-framework';

import BorderStyle from './border-style';
import ColorPicker from '../../containers/data-types/color-palette-picker';
import NumberInput from './number-input';

export default class BorderPicker extends Component {
  static propTypes = {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired
  }

  getInitState () {
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
    var result = {
      top: {
        style: 'none',
        width: 1,
        color: {
          value: '#000000',
          opacity: 100
        }
      },
      left: {
        style: 'none',
        width: 1,
        color: {
          value: '#000000',
          opacity: 100
        }
      },
      right: {
        style: 'none',
        width: 1,
        color: {
          value: '#000000',
          opacity: 100
        }
      },
      bottom: {
        style: 'none',
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

    if (this.equal(result.top, result.right) && this.equal(result.top, result.bottom) && this.equal(result.top, result.left)) {
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
    var values = this.state.values;
    var value = 0;
    var inactive = false;

    if (this.state.selected !== 'center') {
      value = values[this.state.selected];
    } else {
      inactive = !values.equal;
      value = values.top;

      if (inactive) {
        value.style = 'none';
      }
    }

    return (
      <div>
        <div className='border-picker'>
          <div className='toggles'>
            {this.renderToggleButton('top', 'border_top', !values.equal)}
            {this.renderToggleButton('left', 'border_left', !values.equal)}
            {this.renderToggleButton('center', 'border_outer', values.equal)}
            {this.renderToggleButton('right', 'border_right', !values.equal)}
            {this.renderToggleButton('bottom', 'border_bottom', !values.equal)}
          </div>
          <div className='inputs'>
            <BorderStyle value={value.style} onChange={this.onInputChange.bind(this, 'style')} />
            <NumberInput value={value.width} onChange={this.onInputChange.bind(this, 'width')} inactive={inactive} />
          </div>
        </div>
        <ColorPicker className='small' value={value.color} onChange={this.onInputChange.bind(this, 'color')} />
      </div>
    );
  }

  renderToggleButton (pos, icon, active) {
    return (
      <div className={cx('toggle', pos, this.state.selected === pos && 'selected', active && 'active')} onClick={this.changeSelected.bind(this, pos)}>
        <i className='material-icons'>{icon}</i>
      </div>
    );
  }
}
