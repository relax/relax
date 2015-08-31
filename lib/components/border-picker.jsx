import React from 'react';
import {Component} from 'relax-framework';
import NumberInput from './number-input';
import BorderStyle from './border-style';
import ColorPicker from './color-palette-picker';
import cloneDeep from 'lodash.clonedeep';

export default class BorderPicker extends Component {
  getInitialState () {
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
      this.state.values.right = cloneDeep(this.state.values.top);
      this.state.values.bottom = cloneDeep(this.state.values.top);
      this.state.values.left = cloneDeep(this.state.values.top);
      this.state.values.equal = true;
    } else {
      this.state.values[this.state.selected][id] = value;
    }
    this.props.onChange(cloneDeep(this.state.values));
  }

  parseValue (value) {
    var result = {
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

  renderToggleButton (pos, icon, active) {
    var className = 'toggle ' + pos;

    if (this.state.selected === pos) {
      className += ' selected';
    }

    if (active) {
      className += ' active';
    }

    return (
      <div className={className} onClick={this.changeSelected.bind(this, pos)}>
        <i className='material-icons'>{icon}</i>
      </div>
    );
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
          <ColorPicker className='small' value={value.color} onChange={this.onInputChange.bind(this, 'color')} />
        </div>
      </div>
    );
  }
}

BorderPicker.propTypes = {
  value: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};
