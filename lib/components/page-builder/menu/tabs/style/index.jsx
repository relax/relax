import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import getElementProps from '../../../../../helpers/get-element-props';
import StylePicker from '../../../../../containers/style-picker';

export default class Style extends Component {
  static propTypes = {
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired
  }

  render () {
    return (
      <div className='styles-list'>
        {this.renderStyles()}
      </div>
    );
  }

  renderStyles () {
    const {selectedElement, elements} = this.props.pageBuilder;
    let result;
    if (selectedElement && selectedElement.tag !== 'body') {
      const Element = elements[selectedElement.tag];

      if (Element && Element.style) {
        const elementProps = getElementProps(selectedElement, this.props.display);
        result = (
          <StylePicker
            style={Element.style}
            value={elementProps && elementProps.style}
            pageBuilder={this.props.pageBuilder}
            pageBuilderActions={this.props.pageBuilderActions}
          />
        );
      } else {
        result = (
          <div className='none-info'>
            <i className='material-icons'>gps_off</i>
            <div>Current selected element has no style options, head to settings tab to edit its properties!</div>
          </div>
        );
      }
    }
    return result;
  }
}
