import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Animation from './animation';
import Input from '../../../../input';
import OptionsList from '../../../../options-list';

export default class EditProps extends Component {
  static propTypes = {
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired
  }

  displayToggleElement (id, display, event) {
    event.preventDefault();
    // this.context.displayToggleElement(id, display);
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
        const values = Object.assign({}, element.defaultProps, selectedElement.props);
        options = this.renderOptions(element.propsSchema, values);
      }

      result = (
        <div className='element-options'>
          <div className='option'>
            <div className='label'>{selectedElement.tag + ' element label'}</div>
            <Input value={selectedElement.label || selectedElement.tag} onChange={changeElementLabel} />
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
          {options}
          <Animation {...this.props} />
        </div>
      );
    }
    return result;
  }

  renderOptions (options, values) {
    const {changeElementProperty} = this.props.pageBuilderActions;
    return (
      <OptionsList options={options} values={values} onChange={changeElementProperty} />
    );
  }
}
