import * as fontsActions from 'actions/fonts';

import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Fonts from './components/fonts';

@connect(
  (state) => ({
    fonts: state.fonts.fonts,
    manage: state.fonts.manage,
    display: state.fonts.display,
    previewText: state.fonts.previewText,
    loading: state.fonts.loading
  }),
  (dispatch) => bindActionCreators(fontsActions, dispatch)
)
export default class FontsContainer extends Component {
  static propTypes = {
    fonts: PropTypes.object.isRequired,
    manage: PropTypes.bool.isRequired,
    display: PropTypes.oneOf(['list', 'grid']).isRequired,
    previewText: PropTypes.string.isRequired,
    changeFontsPreviewText: PropTypes.func.isRequired,
    changeFontsDisplay: PropTypes.func.isRequired,
    openFontsManage: PropTypes.func.isRequired,
    closeFontsManage: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  };

  render () {
    const {
      fonts,
      manage,
      display,
      previewText,
      changeFontsPreviewText,
      changeFontsDisplay,
      openFontsManage,
      closeFontsManage,
      loading
    } = this.props;

    return (
      <Fonts
        loading={loading}
        fonts={fonts}
        manage={manage}
        display={display}
        previewText={previewText}
        changePreviewText={changeFontsPreviewText}
        changeDisplay={changeFontsDisplay}
        openManage={openFontsManage}
        closeManage={closeFontsManage}
      />
    );
  }
}
