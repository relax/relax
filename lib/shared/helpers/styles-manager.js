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
    const rules = styleOptions.rules(getElementStyleValues(
      styleOptions.defaults,
      options,
      displayOptions,
      display
    ));

    const styleMap = this.stylesMap[id];
    let stylesheet;

    if (single) {
      stylesheet = this.singleStylesheet;
    } else if (styleMap) {
      stylesheet = styleMap.stylesheet;
    } else {
      stylesheet = new Stylesheet();
    }

    let rulesSet;

    if (styleMap) {
      rulesSet = styleMap.rulesSet;
      rulesSet.update(rules);
      stylesheet.update();
    } else {
      rulesSet = stylesheet.createRulesGet(rules);
    }

    const classMap = rulesSet.getRulesMap();
    this.stylesMap = Object.assign({}, this.stylesMap, {
      [id]: {
        options,
        displayOptions,
        display,
        stylesheet,
        classMap,
        rulesSet
      }
    });

    return classMap;
  }

  getClassMap (id, styleOptions, options, displayOptions, display, single) {
    let classMap;
    const styleMap = this.stylesMap[id];
    if (!styleMap ||
        styleMap &&
        (styleMap.options !== options ||
         display !== 'desktop' &&
         styleMap.displayOptions !== displayOptions ||
         styleMap.displayOptions &&
         styleMap.display !== display)
       ) {
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
    if (ElementClass && ElementClass.style) {
      const styleId = elementProps && elementProps.style || 'no_style';
      const styleOptions = this.getStyleOptions(ElementClass.style, elements);

      if (styleId === 'no_style' && !element.style) {
        // Default style
        classMap = this.getClassMap(
          styleOptions.type,
          styleOptions,
          styleOptions.defaults,
          element.displayStyle,
          display,
          single
        );
      } else {
        // Apply style
        if (styleId === 'no_style') {
          classMap = this.getClassMap(
            element.id,
            styleOptions,
            element.style,
            element.displayStyle,
            display,
            single
          );
        } else {
          const style = find(styles, {_id: styleId});
          if (style) {
            classMap = this.getClassMap(
              styleId,
              styleOptions,
              style.options,
              style.displayOptions,
              display,
              single
            );
          }
        }
      }
    }
    return classMap;
  }
}

export default new StylesManager();
