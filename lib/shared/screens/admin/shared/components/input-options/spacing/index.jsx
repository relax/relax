import cx from 'classnames';
import Component from 'components/component';
import NumberInput from 'components/input-options/number';
import React from 'react';

import styles from './index.less';

export default class SpacingPicker extends Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    type: React.PropTypes.string.isRequired
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
    const values = value.split(' ');
    const result = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      equal: false
    };

    if (values.length === 1) {
      const parsedValue = parseInt(values[0], 10);
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
    const values = this.state.values;
    let value = 0;
    let inactive = false;

    if (this.state.selected !== 'center') {
      value = values[this.state.selected];
    } else {
      inactive = !values.equal;
      value =
        values.equal ?
        values.top :
        Math.round((values.top + values.right + values.bottom + values.left) / 4);
    }

    return (
      <div className={cx(styles.root, styles[this.props.type])}>
        <div className={styles.toggles}>
          {this.renderToggleButton('top', 'arrows-1_minimal-up', !values.equal)}
          {this.renderToggleButton('left', 'arrows-1_minimal-left', !values.equal)}
          {this.renderToggleButton('center', 'ui-2_link-68', values.equal)}
          {this.renderToggleButton('right', 'arrows-1_minimal-right', !values.equal)}
          {this.renderToggleButton('bottom', 'arrows-1_minimal-down', !values.equal)}
        </div>
        <div className={styles.inputs}>
          <div className={styles.subLabel}>Value</div>
          <NumberInput value={value} onChange={::this.onInputChange} inactive={inactive} />
        </div>
      </div>
    );
  }

  renderToggleButton (pos, icon, active) {
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
      >
        <i className={cx('nc-icon-mini', icon)}></i>
      </div>
    );
  }
}
