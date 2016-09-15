import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import Overrides from 'components/override-status';
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
    passToOptions: PropTypes.object,
    elementOverride: PropTypes.bool,
    displayOverride: PropTypes.bool
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
      type,
      tight,
      label,
      children,
      elementOverride,
      displayOverride
    } = this.props;

    const overridable = elementOverride || displayOverride;

    return (
      <div className={cx(styles.option, tight && styles.tight)}>
        {this.renderLabel(type !== 'Optional' && label)}
        <div>
          <div className={cx(!label && overridable && styles.maxSize)}>
            {this.renderOptionComp()}
          </div>
          {
            !label && overridable &&
            <div className={styles.sideOverrides}>
              {this.renderOverrides()}
            </div>
          }
        </div>
        {children}
      </div>
    );
  }

  renderOptionComp () {
    const {
      OptionComponent,
      passToOptions,
      extraProps,
      OptionsList,
      value,
      white,
      elementOverride,
      displayOverride
    } = this.props;

    return (
      <OptionComponent
        white={white}
        onChange={this.onChange}
        value={value}
        OptionsList={OptionsList}
        elementOverride={elementOverride}
        displayOverride={displayOverride}
        {...extraProps}
        {...passToOptions}
      />
    );
  }

  renderLabel (label) {
    if (label) {
      const {white} = this.props;
      return (
        <div className={cx(styles.label, white && styles.white)}>
          <span>{label}</span>
          {this.renderOverrides()}
        </div>
      );
    }
  }

  renderOverrides () {
    const {elementOverride, displayOverride} = this.props;

    if (elementOverride || displayOverride) {
      return (
        <Overrides
          elementOverride={elementOverride}
          displayOverride={displayOverride}
          onChange={this.onChange}
        />
      );
    }
  }
}
