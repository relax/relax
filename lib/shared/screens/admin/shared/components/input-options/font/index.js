import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import FontPicker from './font-picker';

@dataConnect()
@connect(
  (state) => ({
    fonts: state.fonts.data
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
    fonts: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired
  };

  initialize () {
    this.props.fetchData({
      fragments: this.constructor.fragments,
      variables: {
        settings: {
          ids: {
            value: ['fonts'],
            type: '[String]!'
          }
        }
      }
    });
  }

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
