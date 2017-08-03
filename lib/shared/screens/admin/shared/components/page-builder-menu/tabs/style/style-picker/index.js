import * as stylesActions from 'actions/styles';

import bind from 'decorators/bind';
import find from 'lodash/find';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import StylePicker from './style-picker';

@connect(
  (state) => {
    const {pageBuilder, styles} = state;
    const {selectedElement} = pageBuilder;

    let selectedStyle;
    if (selectedElement.style) {
      selectedStyle = find(styles, ['_id', selectedElement.style]);
    }

    return {
      selectedStyle
    };
  },
  (dispatch) => bindActionCreators(stylesActions, dispatch)
)
export default class StylePickerContainer extends Component {
  static propTypes = {
    selectedStyle: PropTypes.object,
    updateStyle: PropTypes.func.isRequired
  };

  getInitState () {
    return {
      editing: true
    };
  }

  @bind
  toggleEditing () {
    this.setState({
      editing: !this.state.editing
    });
  }

  @bind
  onTitleChange (value) {
    const {selectedStyle, updateStyle} = this.props;

    if (selectedStyle && selectedStyle._id) {
      updateStyle(selectedStyle._id, {title: value});
    }
  }

  render () {
    const {selectedStyle} = this.props;

    return (
      <StylePicker
        {...this.state}
        selectedStyle={selectedStyle}
        toggleEditing={this.toggleEditing}
        onTitleChange={this.onTitleChange}
      />
    );
  }
}
