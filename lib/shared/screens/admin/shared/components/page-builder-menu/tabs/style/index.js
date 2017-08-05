import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import elements from 'elements';
import StyleTab from './style-tab';

@connect(
  (state) => {
    const {selectedElement, selectedIsTemplate} = state.pageBuilder;
    const ElementClass = selectedElement && elements[selectedElement.tag];

    const eligable = !!(selectedElement && selectedElement.id !== 'Body');
    const stylable = !!(ElementClass && ElementClass.style);
    const isTemplate = selectedIsTemplate;

    return {
      stylable,
      eligable,
      isTemplate
    };
  }
)
export default class StyleTabContainer extends Component {
  static propTypes = {
    stylable: PropTypes.bool.isRequired,
    eligable: PropTypes.bool.isRequired,
    isTemplate: PropTypes.bool.isRequired
  };

  render () {
    const {stylable, eligable, isTemplate} = this.props;

    return (
      <StyleTab
        stylable={stylable}
        eligable={eligable}
        isTemplate={isTemplate}
      />
    );
  }
}
