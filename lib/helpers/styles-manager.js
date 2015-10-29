import find from 'lodash.find';
import forEach from 'lodash.foreach';
import {Stylesheet} from 'relax-jss';

class StylesManager {
  constructor () {
    this.stylesMap = {};
  }

  changeStyle (id, styleOptions, options) {
    const stylesheet = new Stylesheet();
    const rules = styleOptions.rules(Object.assign({}, styleOptions.defaults, options));
    const classMap = stylesheet.createRules(rules);

    this.stylesMap = Object.assign({}, this.stylesMap, {
      [id]: {
        options,
        stylesheet,
        classMap
      }
    });

    return classMap;
  }

  getClassMap (id, styleOptions, options) {
    let classMap;
    const styleMap = this.stylesMap[id];
    if (!styleMap || styleMap && styleMap.options !== options) {
      classMap = this.changeStyle(id, styleOptions, options);
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

  processElement (element, ElementClass, styles, elements) {
    let classMap = {};
    if (ElementClass.style) {
      const styleId = element.props && element.props.style || 'no_style';
      const styleOptions = this.getStyleOptions(ElementClass.style, elements);

      if (styleId === 'no_style' && !element.style) {
        // Default style
        classMap = this.getClassMap(styleOptions.type, styleOptions, styleOptions.defaults);
      } else {
        // Apply style
        if (styleId === 'no_style') {
          classMap = this.getClassMap(element.id, styleOptions, element.style);
        } else {
          const style = find(styles, {_id: styleId});
          if (style) {
            classMap = this.getClassMap(styleId, styleOptions, style.options);
          }
        }
      }
    }
    return classMap;
  }
}

export default new StylesManager();
