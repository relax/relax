import * as colorsActions from '../../client/actions/colors';
import * as overlaysActions from '../../client/actions/overlays';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import ColorPalettePicker from '../../components/data-types/color-palette-picker';

@connect(
  (state) => ({
    colors: state.colors.data
  }),
  (dispatch) => ({
    colorsActions: bindActionCreators(colorsActions, dispatch),
    ...bindActionCreators(overlaysActions, dispatch)
  })
)
export default class ColorPalettePickerContainer extends Component {
  static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    colors: PropTypes.array.isRequired,
    addOverlay: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired,
    colorsActions: PropTypes.object.isRequired
  }

  getInitialState () {
    return {
      opened: false
    };
  }

  onChange (changes) {
    this.props.onChange(Object.assign({}, this.props.value || {}, changes));
  }

  toggleOpened () {
    this.setState({
      opened: !this.state.opened
    });
  }

  render () {
    return (
      <ColorPalettePicker
        opened={this.state.opened}
        value={this.props.value || {
          type: 'custom',
          value: '#000000',
          opacity: 100
        }}
        onChange={::this.onChange}
        colors={this.props.colors}
        toggleOpened={::this.toggleOpened}
        addOverlay={this.props.addOverlay}
        closeOverlay={this.props.closeOverlay}
        colorsActions={this.props.colorsActions}
      />
    );
  }
}
