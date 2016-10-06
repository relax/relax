import * as fontsActions from 'actions/fonts';

import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Custom from './custom';

@connect(
  (state) => ({
    fonts: state.fonts.customFonts,
    tempFonts: state.fonts.tempCustomFonts
  }),
  (dispatch) => bindActionCreators(fontsActions, dispatch)
)
export default class CustomFontsContainer extends Component {
  static propTypes = {
    lib: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    fonts: PropTypes.array,
    tempFonts: PropTypes.array,
    addCustomFonts: PropTypes.func.isRequired,
    removeCustomTempFont: PropTypes.func.isRequired
  };

  static defaultProps = {
    fonts: [],
    tempFonts: []
  };

  render () {
    const {
      fonts,
      tempFonts,
      addCustomFonts,
      removeCustomTempFont
    } = this.props;

    return (
      <Custom
        fonts={fonts}
        tempFonts={tempFonts}
        addCustomFonts={addCustomFonts}
        removeCustomTempFont={removeCustomTempFont}
      />
    );
  }
}
