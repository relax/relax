import Component from 'components/component';
import React, {PropTypes} from 'react';
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
  static propTypes = {
    selectedElement: PropTypes.object,
    elements: PropTypes.object,
    display: PropTypes.string,
    styles: PropTypes.array.isRequired
  };

  render () {
    const {selectedElement, elements, display, styles} = this.props;

    return (
      <Style
        selectedElement={selectedElement}
        elements={elements}
        display={display}
        styles={styles}
      />
    );
  }
}
