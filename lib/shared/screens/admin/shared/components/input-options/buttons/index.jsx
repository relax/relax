import Component from 'components/component';
import bind from 'decorators/bind';
import React from 'react';
import PropTypes from 'prop-types';

import Button from './button';

export default class ButtonsOptions extends Component {
  static propTypes = {
    values: PropTypes.array.isRequired,
    labels: PropTypes.array.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    vertical: PropTypes.bool,
    white: PropTypes.bool,
    tooltips: PropTypes.array
  };

  @bind
  onClick (index) {
    const {values, onChange} = this.props;
    values[index] && onChange(values[index]);
  }

  render () {
    const {labels} = this.props;

    return (
      <div>
        {labels.map(this.renderButton, this)}
      </div>
    );
  }

  renderButton (label, index) {
    const {vertical, labels, white, value, values, tooltips} = this.props;

    return (
      <Button
        key={index}
        index={index}
        onClick={this.onClick}
        vertical={vertical}
        white={white}
        selected={value === values[index]}
        tooltip={tooltips && tooltips[index]}
        total={labels.length}
      >
        {label}
      </Button>
    );
  }
}
