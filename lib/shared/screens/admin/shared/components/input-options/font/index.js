import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import FontPicker from './font-picker';

@dataConnect(
  (state) => ({
    fonts: state.fonts.data
  }),
  null,
  () => ({
    fragments: {
      settings: {
        _id: 1,
        value: 1
      }
    },
    variablesTypes: {
      settings: {
        ids: '[String]!'
      }
    },
    initialVariables: {
      settings: {
        ids: ['fonts']
      }
    }
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
