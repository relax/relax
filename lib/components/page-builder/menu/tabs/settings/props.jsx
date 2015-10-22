import merge from 'lodash.merge';
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
    const {selected, elements} = this.props.pageBuilder;
    const {changeElementLabel} = this.props.pageBuilderActions;
    const element = elements[selected.tag];
    let result;

    if (!element) {
      result = <h6>No element selected</h6>;
    } else {
      let options;
      if (element.propsSchema) {
        const values = Object.assign({}, element.defaultProps, selected.props);
        options = this.renderOptions(element.propsSchema, values);
      }

      result = (
        <div className='element-options'>
          <div className='option'>
            <div className='label'>
              <i className={element.settings.icon.class}>{element.settings.icon.content}</i>
              <span>{selected.tag + ' element label'}</span>
            </div>
            <Input value={selected.label || selected.tag} onChange={changeElementLabel} />
          </div>
          <div className='option'>
            <div className='label'>
              <i className='fa fa-eye'></i>
              <span>Visible on</span>
            </div>
            <div className='visibility'>
              <a
                className={selected.hide && selected.hide.desktop ? 'selected' : ''}
                href='#'
                onClick={this.displayToggleElement.bind(this, selected.id, 'desktop')}>
                <i className='fa fa-desktop'></i>
              </a>
              <a
                className={selected.hide && selected.hide.tablet ? 'selected' : ''}
                href='#'
                onClick={this.displayToggleElement.bind(this, selected.id, 'tablet')}>
                <i className='fa fa-tablet'></i>
              </a>
              <a
                className={selected.hide && selected.hide.mobile ? 'selected' : ''}
                href='#'
                onClick={this.displayToggleElement.bind(this, selected.id, 'mobile')}>
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
