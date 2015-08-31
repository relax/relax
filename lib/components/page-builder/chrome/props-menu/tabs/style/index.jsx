import React from 'react';
import {Component} from 'relax-framework';
import StylePicker from '../../../../../style-picker';

export default class Style extends Component {
  onChange (id) {
    this.context.onPropChange('style', id);
  }

  renderStyles () {
    if (this.context.selected && this.context.selected.tag !== 'body') {
      var element = this.context.selected;
      var Element = this.context.elements[element.tag];

      if (Element && Element.settings && Element.settings.style) {
        return (
          <StylePicker type={Element.settings.style} value={element.props && element.props.style} onChange={this.onChange.bind(this)} />
        );
      } else {
        return (
          <div className='none-info'>
            <i className='material-icons'>gps_off</i>
            <div>Current selected element has no style options, head to settings tab to edit its properties!</div>
          </div>
        );
      }
    }
  }

  render () {
    return (
      <div className='styles-list'>
        {this.renderStyles()}
      </div>
    );
  }
}

Style.contextTypes = {
  elements: React.PropTypes.object.isRequired,
  selected: React.PropTypes.any.isRequired,
  onPropChange: React.PropTypes.func.isRequired
};
