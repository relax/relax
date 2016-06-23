import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class Option extends Component {
  static propTypes = {
    OptionComponent: PropTypes.func.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    extraProps: PropTypes.object.isRequired,
    id: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    unlocks: PropTypes.any,
    OptionsList: PropTypes.func.isRequired,
    children: PropTypes.node,
    tight: PropTypes.bool,
    white: PropTypes.bool,
    passToOptions: PropTypes.object
  };

  @bind
  onChange (value) {
    const {onChange, id} = this.props;
    onChange(id, value);
  }

  render () {
    const {type} = this.props;
    let result;

    if (type === 'Section') {
      result = this.renderSection();
    } else {
      result = this.renderOption();
    }

    return result;
  }

  renderSection () {
    const {OptionComponent, value, extraProps, OptionsList, children} = this.props;

    return (
      <div>
        <OptionComponent
          onChange={this.onChange}
          value={value}
          OptionsList={OptionsList}
          {...extraProps}
        />
        {children}
      </div>
    );
  }

  renderOption () {
    const {
      OptionComponent,
      type,
      tight,
      label,
      children,
      passToOptions,
      extraProps,
      OptionsList,
      value,
      white
    } = this.props;

    return (
      <div className={cx(styles.option, tight && styles.tight)}>
        {this.renderLabel(type !== 'Optional' && label)}
        <OptionComponent
          white={white}
          onChange={this.onChange}
          value={value}
          OptionsList={OptionsList}
          {...extraProps}
          {...passToOptions}
        />
        {children}
      </div>
    );
  }

  renderLabel (label) {
    if (label) {
      const {white} = this.props;
      return (
        <div className={cx(styles.label, white && styles.white)}>
          {label}
        </div>
      );
    }
  }
}
