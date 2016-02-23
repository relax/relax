import getElementProps from 'helpers/get-element-props';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './style.less';
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
      <div className={styles.info}>
        <i className='nc-icon-outline media-1_touch'></i>
        <div className={styles.label}>Relax, you have to select an element first!</div>
      </div>
    );
  }

  renderNotStylable () {
    return (
      <div className={styles.info}>
        <i className='nc-icon-outline media-1_edit-color'></i>
        <div className={styles.label}>Current selected element has no style options.</div>
      </div>
    );
  }
}
