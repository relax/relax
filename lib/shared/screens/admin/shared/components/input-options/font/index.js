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
  static fragments = {
    settings: {
      _id: 1,
      value: 1
    }
  };

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
    fonts: PropTypes.object.isRequired
  };

  static defaultProps = {
    fonts: {}
  };

  render () {
    return (
      <FontPicker
        value={this.props.value || {}}
        onChange={this.props.onChange}
        fonts={this.props.fonts}
      />
    );
  }
}
