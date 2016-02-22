import Component from 'components/component';
import React from 'react';
import {connect} from 'react-redux';

import Style from './style';

@connect(
  (state) => ({
    styles: state.styles.data,
    display: state.display,
    selectedElement: state.pageBuilder.selectedElement,
    elements: state.pageBuilder.elements
  })
)
export default class StyleTabContainer extends Component {
  render () {
    return (
      <Style
        {...this.props}
        {...this.state}
      />
    );
  }
}
