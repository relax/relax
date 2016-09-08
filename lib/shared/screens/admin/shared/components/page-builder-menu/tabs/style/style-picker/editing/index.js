import * as pageBuilderActions from 'actions/page-builder';

import bind from 'decorators/bind';
import forEach from 'lodash.foreach';
import getElementStyleValues from 'helpers/get-element-style-values';
import union from 'lodash.union';
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
    let elementOverrides = null;
    let displayOverrides = null;

    // style values
    let values = styleOptions.defaults;

    if (selectedStyle) {
      values = getElementStyleValues(
        styleOptions.defaults,
        selectedStyle.options,
        selectedStyle.displayOptions,
        display
      );

      // display overrides
      if (display !== 'desktop') {
        const currentDisplayOptions = selectedStyle.displayOptions && selectedStyle.displayOptions[display];

        if (currentDisplayOptions) {
          displayOverrides = Object.keys(currentDisplayOptions);
        }
      }
    }

    // element values
    if (selectedElement.styleProps || selectedElement.displayStyleProps) {
      values = getElementStyleValues(
        values,
        selectedElement.styleProps,
        selectedElement.displayStyleProps,
        display
      );
      hasChanges = true;

      // display and element overrides
      if (display !== 'desktop') {
        const currentDisplayOptions =
          selectedElement.displayStyleProps &&
          selectedElement.displayStyleProps[display];

        if (currentDisplayOptions) {
          const keys = Object.keys(currentDisplayOptions);
          displayOverrides = union(displayOverrides || [], keys);
          elementOverrides = keys;

          // Check if element is overridding a display prop to null
          forEach(currentDisplayOptions, (value, key) => {
            if (value === null) {
              const ind = displayOverrides.indexOf(key);
              displayOverrides.splice(ind, 1);
            }
          });
        }
      } else {
        elementOverrides = selectedElement.styleProps && Object.keys(selectedElement.styleProps);
      }
    }

    return {
      values,
      hasChanges,
      elementOverrides,
      displayOverrides
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
        elementOverrides={values.elementOverrides}
        displayOverrides={values.displayOverrides}
        hasChanges={values.hasChanges}
        onChange={this.onChangeProp}
        onSave={this.onSave}
        onUpdate={this.onUpdate}
      />
    );
  }
}
