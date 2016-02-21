import getElementProps from 'helpers/get-element-props';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import StylePicker from './style-picker';

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

    if (selectedElement) {
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
      <div>
        <i className='material-icons'></i>
        <div>No element selected, select an element first.</div>
      </div>
    );
  }

  renderNotStylable () {
    return (
      <div>
        <i className='material-icons'></i>
        <div>Current selected element has no style options, head to settings tab to edit its properties.</div>
      </div>
    );
  }
}
