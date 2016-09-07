import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import StyleTab from './style-tab';

@connect(
  (state) => {
    const {selectedElement, elements} = state.pageBuilder;
    const ElementClass = selectedElement && elements[selectedElement.tag];

    const eligable = selectedElement && selectedElement.id !== 'body';
    const stylable = ElementClass && ElementClass.style;

    return {
      stylable,
      eligable
    };
  }
)
export default class StyleTabContainer extends Component {
  static propTypes = {
    stylable: PropTypes.bool.isRequired,
    eligable: PropTypes.bool.isRequired
  };

  render () {
    const {stylable, eligable} = this.props;

    return (
      <StyleTab
        stylable={stylable}
        eligable={eligable}
      />
    );
  }
}
