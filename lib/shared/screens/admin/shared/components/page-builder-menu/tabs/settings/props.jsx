import bind from 'decorators/bind';
import getElementProps from 'helpers/get-element-props';
import optionsStyles from 'components/options-list/index.less';
import Button from 'components/button';
import Component from 'components/component';
import Input from 'components/input-options/input';
import OptionsList from 'components/options-list';
import React, {PropTypes} from 'react';

import styles from './props.less';
import Animation from './animation';
import DisplayButton from './display-button';
import Position from './position';

export default class EditProps extends Component {
  static propTypes = {
    pageBuilderActions: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired,
    selectedElement: PropTypes.object,
    selectedId: PropTypes.string,
    elements: PropTypes.object.isRequired,
    type: PropTypes.string
  };

  @bind
  displayToggleElement (display) {
    const {selectedElement} = this.props;
    const {toggleElementVisibleOn} = this.props.pageBuilderActions;
    toggleElementVisibleOn(selectedElement.id, display);
  }

  @bind
  changeElementLabel (value) {
    const {selectedElement} = this.props;
    const {changeElementLabel} = this.props.pageBuilderActions;
    changeElementLabel(selectedElement.id, value);
  }

  @bind
  changeElementProperty (key, value) {
    const {selectedId, pageBuilderActions} = this.props;
    const {changeElementProperty} = pageBuilderActions;
    changeElementProperty(selectedId, key, value);
  }

  @bind
  setContentElement () {
    const {selectedId, pageBuilderActions} = this.props;
    const {setContentElement} = pageBuilderActions;
    setContentElement(selectedId);
  }

  render () {
    const {selectedElement, elements} = this.props;
    const ElementClass = elements[selectedElement.tag];

    return (
      <div className={styles.root}>
        <div className={optionsStyles.option}>
          <div className={optionsStyles.label}>Label</div>
          <Input
            value={selectedElement.label || selectedElement.tag}
            onChange={this.changeElementLabel}
          />
        </div>
        <div className={optionsStyles.option}>
          <div className={optionsStyles.label}>Visible on</div>
          <div>
            <DisplayButton
              active={selectedElement.hide && selectedElement.hide.desktop}
              onClick={this.displayToggleElement}
              icon='nc-icon-mini tech_desktop-screen'
              display='desktop'
            />
            <DisplayButton
              active={selectedElement.hide && selectedElement.hide.tablet}
              onClick={this.displayToggleElement}
              icon='nc-icon-mini tech_tablet-button'
              display='tablet'
            />
            <DisplayButton
              active={selectedElement.hide && selectedElement.hide.mobile}
              onClick={this.displayToggleElement}
              icon='nc-icon-mini tech_mobile-button'
              display='mobile'
            />
          </div>
        </div>
        {this.renderTemplateOptions()}
        <Position {...this.props} />
        {this.renderOptions(ElementClass)}
        <Animation {...this.props} />
      </div>
    );
  }

  renderTemplateOptions () {
    const {type, elements, selectedElement} = this.props;

    if (type === 'template') {
      const ElementClass = elements[selectedElement.tag];

      if (ElementClass.settings.drop) {
        return (
          <div className={optionsStyles.option}>
            <div className={optionsStyles.label}>Template content area</div>
            <Button
              full
              grey
              big
              onClick={this.setContentElement}
            >
              <i className='nc-icon-outline design_app' />
              <span>Make Content Area</span>
            </Button>
          </div>
        );
      }
    }
  }

  renderOptions (ElementClass) {
    const {selectedElement, display} = this.props;

    if (ElementClass.propsSchema) {
      const values = Object.assign({}, ElementClass.defaultProps, getElementProps(selectedElement, display));
      return (
        <OptionsList
          options={ElementClass.propsSchema}
          values={values}
          onChange={this.changeElementProperty}
        />
      );
    }
  }
}
