import find from 'lodash.find';
import forEach from 'lodash.foreach';
import {Stylesheet} from 'relax-jss';

import getElementStyleValues from './get-element-style-values';

class StylesManager {
  constructor () {
    this.stylesMap = {};
    this.singleStylesheet = new Stylesheet();
  }

  /**
   * Creates or changes a style map
   *
   * @param {String} id - style class map id
   * @param {Object} styleOptions - style options set on each element
   * @param {Object} options - style document options (not required)
   * @param {Object} displayOptions - style document display options (not required)
   * @param {Object} styleProps - element style props overwrite (not required)
   * @param {Object} displayStyleProps - element style display props overwrite (not required)
   * @param {String} dislay - current display
   * @param {Boolean} single - set to true to include all styles in one stylesheet (production)
   *
   * @returns {Object} classMap - map of styles to classes
   */
  changeStyle ({id, styleOptions, options, displayOptions, styleProps, displayStyleProps, display, single}) {
    let resultValues = styleOptions.defaults;

    // from style
    if (options || displayOptions) {
      resultValues = getElementStyleValues(
        resultValues,
        options,
        displayOptions,
        display
      );
    }
    // from element overrides
    if (styleProps || displayStyleProps) {
      resultValues = getElementStyleValues(
        resultValues,
        styleProps,
        displayStyleProps,
        display
      );
    }

    const rules = styleOptions.rules(resultValues);

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
        styleProps,
        displayStyleProps,
        stylesheet,
        classMap,
        rulesSet
      }
    });

    return classMap;
  }

  /**
   * Returns a class map based on params (with caching)
   *
   * @param {String} id - style class map id
   * @param {Object} styleOptions - style options set on each element
   * @param {Object} options - style document options (not required)
   * @param {Object} displayOptions - style document display options (not required)
   * @param {Object} styleProps - element style props overwrite (not required)
   * @param {Object} displayStyleProps - element style display props overwrite (not required)
   * @param {String} dislay - current display
   * @param {Boolean} single - set to true to include all styles in one stylesheet (production)
   *
   * @returns {Object} classMap - map of styles to classes
   */
  getClassMap ({id, styleOptions, options, displayOptions, styleProps, displayStyleProps, display, single}) {
    let classMap;
    const styleMap = this.stylesMap[id];

    if (!styleMap || styleMap && (
        styleMap.options !== options ||
        styleMap.displayOptions !== displayOptions ||
        styleMap.styleProps !== styleProps ||
        styleMap.displayStyleProps !== displayStyleProps ||
        styleMap.display !== display
      )) {
      classMap = this.changeStyle({
        id,
        styleOptions,
        options,
        displayOptions,
        styleProps,
        displayStyleProps,
        display,
        single
      });
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

  /**
   * Processes an element style and returns a classes map
   *
   * @param {Object} element - element object
   * @param {Object} elements - elements map object
   * @param {Array} styles - styles array
   * @param {String} dislay - current display
   * @param {Boolean} single - set to true to include all styles in one stylesheet (production)
   *
   * @returns {Object} classMap - map of styles to classes
   */
  processElement ({element, elements, styles, display, single = false}) {
    const ElementClass = elements[element.tag];
    let classMap = {};

    if (ElementClass && ElementClass.style) {
      // There are three states an element can have
      //  1 - no style and no custom changes (default styles)
      //  2 - no style but with custom changes
      //  3 - style and no custom changes
      //  4 - style and custom changes

      const {style, styleProps, displayStyleProps} = element;

      const hasStyle = !!(style);
      const hasCustomChanges = !!(styleProps || displayStyleProps);
      const styleOptions = this.getStyleOptions(ElementClass.style, elements);

      if (hasStyle) {
        // has a style
        const styleDoc = find(styles, {_id: style});

        classMap = this.getClassMap({
          id: hasCustomChanges ? element.id : style,
          styleOptions,
          options: styleDoc && styleDoc.options,
          displayOptions: styleDoc && styleDoc.displayOptions,
          styleProps,
          displayStyleProps,
          display,
          single
        });
      } else {
        // no style
        classMap = this.getClassMap({
          id: hasCustomChanges ? element.id : styleOptions.type,
          styleOptions,
          styleProps,
          displayStyleProps,
          display,
          single
        });
      }
    }

    return classMap;
  }
}

export default new StylesManager();
