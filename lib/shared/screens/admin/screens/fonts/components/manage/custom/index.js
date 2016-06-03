import * as fontsActions from 'actions/fonts';

import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Custom from './custom';

@connect(
  (state) => ({

  }),
  (dispatch) => bindActionCreators(fontsActions, dispatch)
)
export default class CustomFontsContainer extends Component {
  static propTypes = {
    lib: PropTypes.string.isRequired,
    placeholder: PropTypes.string
  };

  render () {
    return (
      <Custom />
    );
  }
}
