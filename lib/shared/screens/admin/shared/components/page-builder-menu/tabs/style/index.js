import * as stylesActions from 'actions/styles';

import debounce from 'lodash.debounce';
import find from 'lodash.find';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Style from './style';

@connect(
  (state) => ({
    styles: state.styles.data,
    display: state.display
  }),
  (dispatch) => bindActionCreators(stylesActions, dispatch)
)
export default class StyleTabContainer extends Component {
  static propTypes = {
    styles: PropTypes.array.isRequired,
    saveStyle: PropTypes.func.isRequired,
    updateStyle: PropTypes.func.isRequired
  };

  getInitState () {
    this.updateStyle = debounce(::this.onUpdateStyle, 3000);
    return {
      editing: true,
      editingTitle: false,
      titleValue: ''
    };
  }

  onUpdateStyle (styleId) {
    if (styleId !== 'no_style') {
      const selectedStyle = find(this.props.styles, {_id: styleId});
      if (selectedStyle) {
        this.props.updateStyle(StyleTabContainer.fragments, selectedStyle);
      }
    }
  }

  render () {
    return (
      <Style
        {...this.props}
      />
    );
  }
}
