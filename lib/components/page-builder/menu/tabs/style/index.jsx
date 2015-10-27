import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
// import StylePicker from '../../../../../style-picker';

export default class Style extends Component {
  static propTypes = {
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired
  }

  onChange (id) {
    // this.context.onPropChange('style', id);
  }

  render () {
    return (
      <div className='styles-list'>
        {this.renderStyles()}
      </div>
    );
  }

  renderStyles () {
    // const {selectedElement} = this.props.pageBuilder;
    // if (selectedElement && selectedElement.tag !== 'body') {
      // var Element = this.context.elements[element.tag];

      // if (Element && Element.settings && Element.settings.style) {
      //   return (
      //     <StylePicker type={Element.settings.style} value={element.props && element.props.style} onChange={this.onChange.bind(this)} />
      //   );
      // } else {
    return (
      <div className='none-info'>
        <i className='material-icons'>gps_off</i>
        <div>Current selected element has no style options, head to settings tab to edit its properties!</div>
      </div>
    );
      // }
    // }
  }
}
