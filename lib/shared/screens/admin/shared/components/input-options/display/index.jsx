import bind from 'decorators/bind';
import Component from 'components/component';
import CssDisplay from 'components/css-display';
import React, {PropTypes} from 'react';

export default class DisplayInputOption extends Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired
  };

  @bind
  onChange (key, val) {
    const {onChange, value} = this.props;
    onChange(Object.assign({}, value, {
      [key]: val
    }));
  }

  render () {
    const {value = {
      display: 'block'
    }} = this.props;

    return (
      <CssDisplay
        values={value}
        onChange={this.onChange}
      />
    );
  }
}
