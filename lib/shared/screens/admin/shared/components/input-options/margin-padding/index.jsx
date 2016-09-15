import bind from 'decorators/bind';
import Component from 'components/component';
import CssPadMarg from 'components/css-pad-marg';
import React, {PropTypes} from 'react';

export default class MarginPaddingInputOption extends Component {
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
    const {value = {}} = this.props;

    return (
      <CssPadMarg
        values={value}
        onChange={this.onChange}
      />
    );
  }
}
