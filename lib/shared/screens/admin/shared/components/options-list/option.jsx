import Component from 'components/component';
import Overrides from 'components/override-status';
import bind from 'decorators/bind';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'components/tooltip';

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
    displayOverride: PropTypes.bool,
    disabled: PropTypes.bool,
    description: PropTypes.string
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
      description,
      children,
      elementOverride,
      displayOverride,
      disabled
    } = this.props;

    const overridable = (elementOverride || displayOverride) && !disabled;

    return (
      <div className={cx(styles.option, tight && styles.tight)}>
        {this.renderLabel(type !== 'Optional' && label, description)}
        <div>
          <div className={cx(!label && overridable && styles.maxSize, disabled && styles.disabled)}>
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

  renderLabel (label, description) {
    if (label) {
      const {white, disabled} = this.props;
      return (
        <div className={cx(styles.label, white && styles.white)}>
          <span>{label}</span>
          {this.renderTooltip(description)}
          {!disabled && this.renderOverrides()}
        </div>
      );
    }
  }

  renderTooltip (description) {
    if (description) {
      return (
        <Tooltip label={description} className={cx(styles.tooltip)} maxWidth={250}>
          <span >
            <i className='nc-icon-outline ui-2_alert-circle-i' />
          </span>
        </Tooltip>
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
