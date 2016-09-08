import warning from 'warning';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import TypesOptionsMap, {TypesOptionsDefaultProps} from 'components/input-options';

import styles from './index.less';
import Option from './option';

export default class OptionsList extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    values: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    passToOptions: PropTypes.object,
    white: PropTypes.bool,
    tight: PropTypes.bool,
    elementOverrides: PropTypes.array,
    displayOverrides: PropTypes.array
  };

  static defaultProps = {
    passToOptions: {}
  };

  onChange (id, value) {
    this.props.onChange(id, value);
  }

  render () {
    return this.renderOptions(this.props.options);
  }

  renderOptions (options) {
    return (
      <div className={styles.group}>
        {options.map(this.renderOption, this)}
      </div>
    );
  }

  renderColumn (option, index) {
    return (
      <div className={styles.column} key={index}>
        {this.renderOption(option)}
      </div>
    );
  }

  renderColumns (option, key) {
    return (
      <div className={styles.columns} key={key}>
        {option.options.map(this.renderColumn, this)}
      </div>
    );
  }

  renderUnlocks (option, value, extraProps) {
    let result;

    if (option.type === 'Optional') {
      if (value && option.unlocks.length > 1) {
        result = this.renderOptions(option.unlocks);
      } else if (value && option.unlocks.length === 1) {
        result = (
          <div>{this.renderOptions(option.unlocks)}</div>
        );
      }
      extraProps.label = option.label;
    } else if (option.type === 'Section') {
      if (value) {
        result = (
          <div className={styles.section}>
            {this.renderOptions(option.unlocks)}
          </div>
        );
      }
      extraProps.label = option.label;
    } else if (option.unlocks.constructor === Array) {
      result = this.renderOptions(option.unlocks);
    } else if (option.unlocks[value]) {
      result = this.renderOptions(option.unlocks[value]);
    }

    return result;
  }

  renderOption (option, index) {
    const OptionComponent = TypesOptionsMap[option.type];
    let result;

    if (option.type === 'Columns') {
      result = this.renderColumns(option, index);
    } else if (OptionComponent) {
      const {values, onChange, tight, passToOptions, white, elementOverrides, displayOverrides} = this.props;
      const value = values[option.id];
      const extraProps = Object.assign({}, TypesOptionsDefaultProps[option.type], option.props);
      const unlockedContent = option.unlocks && value !== '' && this.renderUnlocks(option, value, extraProps);

      let elementOverride = false;
      let displayOverride = false;

      if (elementOverrides) {
        elementOverride = elementOverrides.indexOf(option.id) !== -1;
      }
      if (displayOverrides) {
        displayOverride = displayOverrides.indexOf(option.id) !== -1;
      }

      result = (
        <Option
          OptionComponent={OptionComponent}
          value={value}
          onChange={onChange}
          extraProps={extraProps}
          id={option.id}
          label={option.label || option.title}
          type={option.type}
          unlocks={option.unlocks}
          tight={tight}
          OptionsList={OptionsList}
          passToOptions={passToOptions}
          elementOverride={elementOverride}
          displayOverride={displayOverride}
          white={white}
          key={option.id || index}
        >
          {unlockedContent}
        </Option>
      );
    } else {
      warning(false, `Option type ${option.type} is not valid!`);
    }

    return result;
  }
}
