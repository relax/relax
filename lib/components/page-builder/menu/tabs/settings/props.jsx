import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import getElementProps from '../../../../../helpers/get-element-props';
import Animation from './animation';
import Input from '../../../../data-types/input';
import OptionsList from '../../../../options-list';
import Position from './position';

export default class EditProps extends Component {
  static propTypes = {
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired
  }

  displayToggleElement (id, display, event) {
    event.preventDefault();
    const {toggleElementVisibleOn} = this.props.pageBuilderActions;
    toggleElementVisibleOn(id, display);
  }

  render () {
    const {selectedElement, elements} = this.props.pageBuilder;
    const {changeElementLabel} = this.props.pageBuilderActions;
    const element = elements[selectedElement.tag];
    let result;

    if (!element) {
      result = <h6>No element selected</h6>;
    } else {
      let options;
      if (element.propsSchema) {
        const values = Object.assign({}, element.defaultProps, getElementProps(selectedElement, this.props.display));
        options = this.renderOptions(element.propsSchema, values);
      }
      const label = typeof selectedElement.label === 'string' ? selectedElement.label : selectedElement.tag;

      result = (
        <div className='element-options'>
          <div className='option'>
            <div className='label'>{selectedElement.tag + ' element label'}</div>
            <Input value={label} onChange={changeElementLabel.bind(this, selectedElement.id)} />
          </div>
          <div className='option'>
            <div className='label'>Visible on</div>
            <div className='visibility'>
              <a
                className={selectedElement.hide && selectedElement.hide.desktop ? 'selected' : ''}
                href='#'
                onClick={this.displayToggleElement.bind(this, selectedElement.id, 'desktop')}>
                <i className='fa fa-desktop'></i>
              </a>
              <a
                className={selectedElement.hide && selectedElement.hide.tablet ? 'selected' : ''}
                href='#'
                onClick={this.displayToggleElement.bind(this, selectedElement.id, 'tablet')}>
                <i className='fa fa-tablet'></i>
              </a>
              <a
                className={selectedElement.hide && selectedElement.hide.mobile ? 'selected' : ''}
                href='#'
                onClick={this.displayToggleElement.bind(this, selectedElement.id, 'mobile')}>
                <i className='fa fa-mobile'></i>
              </a>
            </div>
          </div>
          <Position {...this.props} />
          {options}
          <Animation {...this.props} />
        </div>
      );
    }
    return result;
  }

  renderOptions (options, values) {
    const {changeElementProperty} = this.props.pageBuilderActions;
    const {selectedId} = this.props.pageBuilder;
    return (
      <OptionsList options={options} values={values} onChange={changeElementProperty.bind(this, selectedId)} passToOptions={{
        pageBuilder: this.props.pageBuilder,
        pageBuilderActions: this.props.pageBuilderActions
      }} />
    );
  }
}
