import Component from 'components/component';
import NumberInput from 'components/input-options/number';
import bind from 'decorators/bind';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

export default class CornersPicker extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

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

  @bind
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
    return `${values.tl || '0'} ${values.tr || '0'} ${values.br || '0'} ${values.bl || '0'}`;
  }

  parseValue (value = '0px') {
    const values = value.split(' ');
    const result = {
      tl: '0px',
      bl: '0px',
      tr: '0px',
      br: '0px',
      equal: false
    };

    if (values.length === 1) {
      const parsedValue = values[0];
      result.tl = parsedValue;
      result.br = parsedValue;
      result.bl = parsedValue;
      result.tr = parsedValue;
    } else if (values.length === 2) {
      result.tl = values[0];
      result.tr = values[1];
      result.br = values[0];
      result.bl = values[1];
    } else if (values.length === 4) {
      result.tl = values[0];
      result.tr = values[1];
      result.br = values[2];
      result.bl = values[3];
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
      <div className={styles.root}>
        <div className={styles.toggles}>
          {this.renderToggleButton('tl', !values.equal)}
          {this.renderToggleButton('bl', !values.equal)}
          {this.renderToggleButton('tr', !values.equal)}
          {this.renderToggleButton('br', !values.equal)}
          {this.renderToggleButton('center', values.equal)}
        </div>
        <div className={styles.inputs}>
          <NumberInput
            small
            value={value}
            onChange={this.onInputChange}
            inactive={inactive}
            allowed={['px', '%']}
          />
        </div>
      </div>
    );
  }

  renderToggleButton (pos, active) {
    const onClick = this.changeSelected.bind(this, pos);

    return (
      <div
        className={cx(
          styles.toggle,
          styles[pos],
          this.state.selected === pos && styles.selected,
          active && styles.active
        )}
        onClick={onClick}
      />
    );
  }
}
