import Component from 'components/component';
import React from 'react';
import {changeColorLabel, changeColorValue, createColor, updateColorFromState} from 'actions/colors';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import New from './new';

@connect(
  (state) => ({
    loading: state.color.loading,
    label: state.color.label,
    value: state.color.value
  }),
  (dispatch) => bindActionCreators({
    changeColorLabel,
    changeColorValue,
    createColor,
    updateColorFromState
  }, dispatch)
)
export default class NewColorContainer extends Component {
  render () {
    return (
      <New {...this.props} />
    );
  }
}
