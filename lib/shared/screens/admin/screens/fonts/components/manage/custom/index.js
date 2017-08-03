import * as fontsActions from 'actions/fonts';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

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
    fonts: PropTypes.array,
    tempFonts: PropTypes.array,
    addCustomFonts: PropTypes.func.isRequired,
    removeCustomTempFont: PropTypes.func.isRequired,
    removeCustomFont: PropTypes.func.isRequired
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
      removeCustomTempFont,
      removeCustomFont
    } = this.props;

    return (
      <Custom
        fonts={fonts}
        tempFonts={tempFonts}
        addCustomFonts={addCustomFonts}
        removeCustomTempFont={removeCustomTempFont}
        removeCustomFont={removeCustomFont}
      />
    );
  }
}
