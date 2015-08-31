import React from 'react';
import {Component} from 'relax-framework';
import Animation from './animation';
import OptionsList from '../../../../../options-list';
import merge from 'lodash.merge';
import Input from '../../../../../input';

export default class EditProps extends Component {

  displayToggleElement (id, display, event) {
    event.preventDefault();
    this.context.displayToggleElement(id, display);
  }

  renderOptions (options, values) {
    return (
      <OptionsList options={options} values={values} onChange={this.context.onPropChange} />
    );
  }

  render () {
    var element = this.context.elements[this.context.selected.tag];
    var options = null;

    if (!element) {
      return <h6>No element selected</h6>;
    }

    if (element.propsSchema) {
      var values = {};
      merge(values, element.defaultProps);
      merge(values, this.context.selected.props);
      options = this.renderOptions(element.propsSchema, values);
    }

    return (
      <div className='element-options'>
        <div className='option'>
          <div className='label'>
            <i className={element.settings.icon.class}>{element.settings.icon.content}</i>
            {this.context.selected.tag + ' element label'}
          </div>
          <Input value={this.context.selected.label || this.context.selected.tag} onChange={this.context.onLabelChange.bind(this)}></Input>
        </div>
        <div className='option'>
          <div className='label'>
            <i className='fa fa-eye'></i>
            <span>Visible on</span>
          </div>
          <div className='visibility'>
            <a
              className={this.context.selected.hide && this.context.selected.hide.desktop ? 'selected' : ''}
              href='#'
              onClick={this.displayToggleElement.bind(this, this.context.selected.id, 'desktop')}>
              <i className='fa fa-desktop'></i>
            </a>
            <a
              className={this.context.selected.hide && this.context.selected.hide.tablet ? 'selected' : ''}
              href='#'
              onClick={this.displayToggleElement.bind(this, this.context.selected.id, 'tablet')}>
              <i className='fa fa-tablet'></i>
            </a>
            <a
              className={this.context.selected.hide && this.context.selected.hide.mobile ? 'selected' : ''}
              href='#'
              onClick={this.displayToggleElement.bind(this, this.context.selected.id, 'mobile')}>
              <i className='fa fa-mobile'></i>
            </a>
          </div>
        </div>
        {options}
        <Animation />
      </div>
    );
  }
}

EditProps.contextTypes = {
  elements: React.PropTypes.object.isRequired,
  selected: React.PropTypes.any.isRequired,
  onPropChange: React.PropTypes.func.isRequired,
  displayToggleElement: React.PropTypes.func.isRequired,
  onLabelChange: React.PropTypes.func.isRequired
};
