import React from 'react';
import {Component} from 'relax-framework';

import NumberInput from './number-input';

export default class SpacingPicker extends Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    type: React.PropTypes.string.isRequired
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

  onInputChange (value) {
    if (this.state.selected === 'center') {
      this.state.values.top = value;
      this.state.values.right = value;
      this.state.values.bottom = value;
      this.state.values.left = value;
    } else {
      this.state.values[this.state.selected] = value;
    }
    this.props.onChange(this.getValuesString(this.state.values));
  }

  getValuesString (values) {
    return `${values.top || '0'}px ${values.right || '0'}px ${values.bottom || '0'}px ${values.left || '0'}px`;
  }

  parseValue (value) {
    var values = value.split(' ');
    var result = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      equal: false
    };

    if (values.length === 1) {
      var parsedValue = parseInt(values[0], 10);
      result.top = parsedValue;
      result.bottom = parsedValue;
      result.left = parsedValue;
      result.right = parsedValue;
    } else if (values.length === 2) {
      result.top = parseInt(values[0], 10);
      result.right = parseInt(values[1], 10);
      result.bottom = parseInt(values[0], 10);
      result.left = parseInt(values[1], 10);
    } else if (values.length === 4) {
      result.top = parseInt(values[0], 10);
      result.right = parseInt(values[1], 10);
      result.bottom = parseInt(values[2], 10);
      result.left = parseInt(values[3], 10);
    }

    if (result.top === result.right && result.top === result.bottom && result.top === result.left) {
      result.equal = true;
    } else {
      result.equal = false;
    }

    return result;
  }

  changeSelected (selected, event) {
    event.preventDefault();
    this.setState({
      selected
    });
  }

  render () {
    var className = 'spacing-picker type-' + this.props.type;
    var values = this.state.values;
    var value = 0;
    var inactive = false;

    if (this.state.selected !== 'center') {
      value = values[this.state.selected];
    } else {
      inactive = !values.equal;
      value = values.equal ? values.top : Math.round((values.top + values.right + values.bottom + values.left) / 4);
    }

    return (
      <div className={className}>
        <div className='toggles'>
          {this.renderToggleButton('top', 'expand_less', !values.equal)}
          {this.renderToggleButton('left', 'chevron_left', !values.equal)}
          {this.renderToggleButton('center', 'link', values.equal)}
          {this.renderToggleButton('right', 'chevron_right', !values.equal)}
          {this.renderToggleButton('bottom', 'expand_more', !values.equal)}
        </div>
        <div className='inputs'>
          <div className='sub-label'>Value</div>
          <NumberInput value={value} onChange={this.onInputChange.bind(this)} inactive={inactive} />
        </div>
      </div>
    );
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
}
