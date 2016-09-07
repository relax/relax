import bind from 'decorators/bind';
import find from 'lodash.find';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import StylePicker from './style-picker';

@connect(
  (state) => {
    const {pageBuilder, styles} = state;
    const {selectedElement} = pageBuilder;

    let selectedStyle;
    if (selectedElement.style) {
      selectedStyle = find(styles, '_id', selectedElement.style);
    }

    return {
      selectedStyle
    };
  }
)
export default class StylePickerContainer extends Component {
  static propTypes = {
    selectedStyle: PropTypes.object
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

  render () {
    const {selectedStyle} = this.props;

    return (
      <StylePicker
        {...this.state}
        selectedStyle={selectedStyle}
        toggleEditing={this.toggleEditing}
      />
    );
  }
}
