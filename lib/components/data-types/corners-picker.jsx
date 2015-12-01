import cx from 'classnames';
import React from 'react';
import {Component} from 'relax-framework';

import NumberInput from './number-input';

export default class CornersPicker extends Component {
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
      this.state.values.tl = value;
      this.state.values.tr = value;
      this.state.values.br = value;
      this.state.values.bl = value;
    } else {
      this.state.values[this.state.selected] = value;
    }
    this.props.onChange(this.getValuesString(this.state.values));
  }

  getValuesString (values) {
    return `${values.tl || '0'}px ${values.tr || '0'}px ${values.br || '0'}px ${values.bl || '0'}px`;
  }

  parseValue (value) {
    var values = value.split(' ');
    var result = {
      tl: 0,
      bl: 0,
      tr: 0,
      br: 0,
      equal: false
    };

    if (values.length === 1) {
      var parsedValue = parseInt(values[0], 10);
      result.tl = parsedValue;
      result.br = parsedValue;
      result.bl = parsedValue;
      result.tr = parsedValue;
    } else if (values.length === 2) {
      result.tl = parseInt(values[0], 10);
      result.tr = parseInt(values[1], 10);
      result.br = parseInt(values[0], 10);
      result.bl = parseInt(values[1], 10);
    } else if (values.length === 4) {
      result.tl = parseInt(values[0], 10);
      result.tr = parseInt(values[1], 10);
      result.br = parseInt(values[2], 10);
      result.bl = parseInt(values[3], 10);
    }

    if (result.tl === result.tr && result.tl === result.br && result.tl === result.bl) {
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
    const values = this.state.values;
    let inactive = false;
    let value = 0;

    if (this.state.selected !== 'center') {
      value = values[this.state.selected];
    } else {
      inactive = !values.equal;
      value = values.equal ? values.tl : Math.round((values.tl + values.tr + values.br + values.bl) / 4);
    }

    return (
      <div className={cx('corners-picker', this.props.type)}>
        <div className='toggles'>
          {this.renderToggleButton('tl', !values.equal)}
          {this.renderToggleButton('bl', !values.equal)}
          {this.renderToggleButton('tr', !values.equal)}
          {this.renderToggleButton('br', !values.equal)}
          {this.renderToggleButton('center', values.equal)}
        </div>
        <div className='inputs'>
          <NumberInput className='micro' value={value} onChange={this.onInputChange.bind(this)} inactive={inactive} label='px' />
        </div>
      </div>
    );
  }

  renderToggleButton (pos, active) {
    return (
      <div
        className={cx('toggle', pos, this.state.selected === pos && 'selected', active && 'active')}
        onClick={this.changeSelected.bind(this, pos)}
      />
    );
  }
}
