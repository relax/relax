import find from 'lodash.find';
import forEach from 'lodash.foreach';
import {Stylesheet} from 'relax-jss';

import getElementStyleValues from './get-element-style-values';

class StylesManager {
  constructor () {
    this.stylesMap = {};
    this.singleStylesheet = new Stylesheet();
  }

  changeStyle (id, styleOptions, options, displayOptions, display, single) {
    const stylesheet = single && this.singleStylesheet || new Stylesheet();
    const rules = styleOptions.rules(getElementStyleValues(styleOptions.defaults, options, displayOptions, display));
    const classMap = stylesheet.createRules(rules);

    this.stylesMap = Object.assign({}, this.stylesMap, {
      [id]: {
        options,
        displayOptions,
        display,
        stylesheet,
        classMap
      }
    });

    return classMap;
  }

  getClassMap (id, styleOptions, options, displayOptions, display, single) {
    let classMap;
    const styleMap = this.stylesMap[id];
    if (!styleMap || styleMap && (styleMap.options !== options || display !== 'desktop' && styleMap.displayOptions !== displayOptions || styleMap.displayOptions && styleMap.display !== display)) {
      classMap = this.changeStyle(id, styleOptions, options, displayOptions, display, single);
    } else {
      classMap = styleMap.classMap;
    }
    return classMap;
  }

  getStyleOptions (style, elements) {
    let result = style;
    if (typeof style === 'string') {
      forEach(elements, (element) => {
        if (element.style && typeof element.style === 'object' && element.style.type === style) {
          result = element.style;
        }
      });
    }
    return result;
  }

  processElement (element, elementProps, ElementClass, styles, elements, display, single = false) {
    let classMap = {};
    if (ElementClass.style) {
      const styleId = elementProps && elementProps.style || 'no_style';
      const styleOptions = this.getStyleOptions(ElementClass.style, elements);

      if (styleId === 'no_style' && !element.style) {
        // Default style
        classMap = this.getClassMap(styleOptions.type, styleOptions, styleOptions.defaults, element.displayStyle, display, single);
      } else {
        // Apply style
        if (styleId === 'no_style') {
          classMap = this.getClassMap(element.id, styleOptions, element.style, element.displayStyle, display, single);
        } else {
          const style = find(styles, {_id: styleId});
          if (style) {
            classMap = this.getClassMap(styleId, styleOptions, style.options, style.displayOptions, display, single);
          }
        }
      }
    }
    return classMap;
  }
}

export default new StylesManager();
