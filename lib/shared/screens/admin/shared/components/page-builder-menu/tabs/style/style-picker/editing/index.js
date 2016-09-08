import * as pageBuilderActions from 'actions/page-builder';

import bind from 'decorators/bind';
import forEach from 'lodash.foreach';
import getElementStyleValues from 'helpers/get-element-style-values';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Editing from './editing';

@connect(
  (state) => {
    const {display} = state;
    const {selectedElement, elements, selected} = state.pageBuilder;
    const ElementClass = elements[selectedElement.tag];

    // get element style options
    let styleOptions;
    if (typeof ElementClass.style === 'string') {
      // this element style setting is a reference to another style
      forEach(elements, (element) => {
        if (element.style &&
            typeof element.style === 'object' &&
            element.style.type === ElementClass.style) {
          styleOptions = element.style;
        }
      });
    } else {
      styleOptions = ElementClass.style;
    }

    return {
      styleOptions,
      selectedElement,
      selected,
      display
    };
  },
  (dispatch) => bindActionCreators(pageBuilderActions, dispatch)
)
export default class StylePickerEditingContainer extends Component {
  static propTypes = {
    selectedStyle: PropTypes.object,
    styleOptions: PropTypes.object.isRequired,
    selectedElement: PropTypes.object.isRequired,
    selected: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired,
    changeElementStyleProp: PropTypes.func.isRequired,
    createStyleFromSelectedElement: PropTypes.func.isRequired,
    saveSelectedElementStyleChanges: PropTypes.func.isRequired
  };

  @bind
  onChangeProp (property, value) {
    const {changeElementStyleProp, selected} = this.props;
    changeElementStyleProp(
      selected.id,
      property,
      value,
      selected.context
    );
  }

  @bind
  onSave (title) {
    const {createStyleFromSelectedElement, selectedStyle} = this.props;

    if (title) {
      // create new style
      createStyleFromSelectedElement(title, selectedStyle);
    }
  }

  @bind
  onUpdate () {
    const {
      selectedStyle,
      saveSelectedElementStyleChanges
    } = this.props;

    // save to style
    saveSelectedElementStyleChanges(selectedStyle);
  }

  calcValues () {
    const {selectedStyle, display, selectedElement, styleOptions} = this.props;
    let hasChanges = false;

    // style values
    let values = getElementStyleValues(
      styleOptions.defaults,
      selectedStyle && selectedStyle.options,
      selectedStyle && selectedStyle.displayOptions,
      display
    );

    // element values
    if (selectedElement.styleProps || selectedElement.displayStyleProps) {
      values = getElementStyleValues(
        values,
        selectedElement.styleProps,
        selectedElement.displayStyleProps,
        display
      );
      hasChanges = true;
    }

    return {
      values,
      hasChanges
    };
  }

  render () {
    const {styleOptions, selectedStyle} = this.props;
    const values = this.calcValues();

    return (
      <Editing
        selectedStyle={selectedStyle}
        options={styleOptions.options}
        values={values.values}
        hasChanges={values.hasChanges}
        onChange={this.onChangeProp}
        onSave={this.onSave}
        onUpdate={this.onUpdate}
      />
    );
  }
}
