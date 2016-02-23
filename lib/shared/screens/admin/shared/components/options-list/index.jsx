import cx from 'classnames';
import merge from 'lodash.merge';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {TypesOptionsMap, TypesOptionsDefaultProps} from 'helpers/input-options-map';

import styles from './index.less';

export default class OptionsList extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    values: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    passToOptions: PropTypes.object,
    white: PropTypes.bool,
    tight: PropTypes.bool
  };

  static defaultProps = {
    passToOptions: {}
  };

  onChange (id, value) {
    this.props.onChange(id, value);
  }

  render () {
    return (
      <div>
        {this.renderOptions(this.props.options)}
      </div>
    );
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
      <div className={styles.column}>
        {this.renderOption(option)}
      </div>
    );
  }

  renderOption (option, index) {
    let result;

    if (option.type === 'Columns') {
      result = (
        <div className={styles.columns} key={index}>
          {option.options.map(this.renderColumn, this)}
        </div>
      );
    } else if (TypesOptionsMap[option.type]) {
      const Option = TypesOptionsMap[option.type];
      const value = this.props.values[option.id];
      const extraProps = merge({}, TypesOptionsDefaultProps[option.type] || {});
      merge(extraProps, option.props || {});

      var unlockedContent = null;
      if (option.unlocks && value !== '') {
        if (option.type === 'Optional') {
          if (value && option.unlocks.length > 1) {
            unlockedContent = this.renderOptions(option.unlocks);
          } else if (value && option.unlocks.length === 1) {
            unlockedContent = (
              <div>{this.renderOptions(option.unlocks)}</div>
            );
          }
          extraProps.label = option.label;
        } else if (option.type === 'Section') {
          if (value) {
            unlockedContent = <div className={styles.section}>{this.renderOptions(option.unlocks)}</div>;
          }
          extraProps.label = option.label;
        } else if (option.unlocks.constructor === Array) {
          unlockedContent = this.renderOptions(option.unlocks);
        } else if (option.unlocks[value]) {
          unlockedContent = this.renderOptions(option.unlocks[value]);
        }
      }

      if (option.type === 'Section') {
        result = (
          <div key={option.id}>
            <Option onChange={this.onChange.bind(this, option.id)} value={value} {...extraProps} OptionsList={OptionsList} />
            {unlockedContent}
          </div>
        );
      } else {
        result = (
          <div className={cx(styles.option, this.props.tight && styles.tight)} key={option.id}>
            {this.renderLabel(option.type !== 'Optional' && option.label)}
            <Option white={this.props.white} onChange={this.onChange.bind(this, option.id)} value={value} {...extraProps} OptionsList={OptionsList} {...this.props.passToOptions} />
            {unlockedContent}
          </div>
        );
      }
    } else {
      console.log('Element option type not valid');
    }
    return result;
  }

  renderLabel (label) {
    if (label) {
      const {white} = this.props;
      return (
        <div className={cx(styles.label, white && styles.white)}>{label}</div>
      );
    }
  }
}
