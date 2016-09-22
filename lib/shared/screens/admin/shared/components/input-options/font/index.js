import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import FontPicker from './font-picker';

@connect(
  (state) => ({
    fonts: state.fonts.fonts
  })
)
export default class FontPickerContainer extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
    fonts: PropTypes.object.isRequired
  };

  static defaultProps = {
    fonts: {}
  };

  render () {
    const {value = {}, onChange, fonts} = this.props;
    return (
      <FontPicker
        value={value}
        onChange={onChange}
        fonts={fonts}
      />
    );
  }
}
