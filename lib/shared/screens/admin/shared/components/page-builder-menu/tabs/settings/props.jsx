import Component from 'components/component';
import Input from 'components/input-options/input';
import OptionsList from 'components/options-list';
import bind from 'decorators/bind';
import elements from 'elements';
import find from 'lodash/find';
import getElementProps from 'helpers/element/get-props';
import optionsStyles from 'components/options-list/index.less';
import React from 'react';
import PropTypes from 'prop-types';

import Animation from './animation';
import styles from './props.less';

export default class EditProps extends Component {
  static propTypes = {
    pageBuilderActions: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired,
    selected: PropTypes.object,
    selectedElement: PropTypes.object,
    type: PropTypes.string,
    contentElementId: PropTypes.string,
    isTemplate: PropTypes.bool.isRequired,
    selectedLinks: PropTypes.array.isRequired
  };

  @bind
  changeElementLabel (value) {
    const {selected} = this.props;
    const {changeElementLabel} = this.props.pageBuilderActions;
    changeElementLabel(selected.id, value, selected.context);
  }

  @bind
  changeElementProperty (key, value) {
    const {selected, pageBuilderActions} = this.props;
    const {changeElementProperty} = pageBuilderActions;
    changeElementProperty(selected.id, key, value, selected.context);
  }

  @bind
  changeDocProperty (key, value) {
    const {pageBuilderActions, selectedLinks} = this.props;
    const {changeDocProperty} = pageBuilderActions;

    const link = find(selectedLinks, {action: key});

    if (link) {
      changeDocProperty(link.property, value);
    }
  }

  render () {
    return (
      <div className={styles.root}>
        {this.renderLabelOption()}
        {this.renderOptions()}
        {this.renderAnimation()}
      </div>
    );
  }

  renderLabelOption () {
    const {selectedElement, isTemplate} = this.props;

    if (!isTemplate) {
      return (
        <div className={optionsStyles.option}>
          <div className={optionsStyles.label}>Label</div>
          <Input
            value={selectedElement.label || selectedElement.tag}
            onChange={this.changeElementLabel}
          />
        </div>
      );
    }
  }

  renderAnimation () {
    const {isTemplate} = this.props;

    if (!isTemplate) {
      return (
        <Animation {...this.props} />
      );
    }
  }

  renderOptions () {
    const {selectedElement, display, selectedLinks, isTemplate} = this.props;
    const ElementClass = elements[selectedElement.tag];

    if (ElementClass.propsSchema) {
      const values = Object.assign({}, ElementClass.defaultProps, getElementProps(selectedElement, display));

      return (
        <OptionsList
          options={ElementClass.propsSchema}
          values={values}
          onChange={isTemplate ? this.changeDocProperty : this.changeElementProperty}
          filter={isTemplate && selectedLinks.map((link) => link.action)}
        />
      );
    }
  }
}
