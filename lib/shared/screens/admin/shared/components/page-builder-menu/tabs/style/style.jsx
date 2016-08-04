import getElementProps from 'helpers/get-element-props';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import StylePicker from './style-picker';
import TabEmpty from '../tab-empty';

export default class Style extends Component {
  static propTypes = {
    selectedElement: PropTypes.object,
    elements: PropTypes.object,
    display: PropTypes.string,
    styles: PropTypes.array.isRequired
  };

  render () {
    const {selectedElement, elements} = this.props;
    let result;

    if (selectedElement && selectedElement.id !== 'body') {
      const Element = elements[selectedElement.tag];

      if (Element && Element.style) {
        result = this.renderStylePicker(Element);
      } else {
        result = this.renderNotStylable();
      }
    } else {
      result = this.renderNoneSelected();
    }

    return result;
  }

  renderStylePicker (Element) {
    const {selectedElement, display} = this.props;
    const elementProps = getElementProps(selectedElement, display);

    return (
      <StylePicker
        style={Element.style}
        value={elementProps && elementProps.style}
      />
    );
  }

  renderNoneSelected () {
    return (
      <TabEmpty />
    );
  }

  renderNotStylable () {
    return (
      <TabEmpty icon='nc-icon-outline media-1_edit-color'>
        Current selected element has no style options.
      </TabEmpty>
    );
  }
}
