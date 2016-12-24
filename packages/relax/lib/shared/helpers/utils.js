import Colr from 'colr';
import cloneDeep from 'lodash/cloneDeep';
import forEach from 'lodash/forEach';

import {getColorString} from './styles/colors';

const utils = {
  isPercentage (str) {
    return str && str[str.length - 1] === '%';
  },

  roundSnap (value, snaps) {
    let result = Math.round(value);
    forEach(snaps, (snap) => {
      if (value > snap - 1 && value < snap + 1) {
        result = snap;
      }
    });
    return result;
  },

  placeCaretAtEnd (el) {
    if (!el || !el.focus) {
      return;
    }
    el.focus();

    if (typeof window.getSelection !== 'undefined' && typeof document.createRange !== 'undefined') {
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);

      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange !== 'undefined') {
      const textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  },

  pointsDistance (p1, p2) {
    const distX = p1.x - p2.x;
    const distY = p1.y - p2.y;
    return Math.sqrt(distX * distX + distY * distY);
  },

  getPointInLineByPerc (pointA, pointB, perc) {
    // PA + t / 100 * (PA - PB)
    return {
      x: pointA.x + perc / 100 * (pointB.x - pointA.x),
      y: pointA.y + perc / 100 * (pointB.y - pointA.y)
    };
  },

  validateGATrackingId (str) {
    return /(UA|YT|MO)-\d+-\d+/i.test(str);
  },

  makeBorder (style, property, border) {
    if (border.style !== 'none' && border.width !== 0) {
      style[property] = `${border.width}px ${border.style} ${getColorString(border.color)}`;
    }
  },

  applyBorders (style, borderObj) {
    if (borderObj && borderObj.top && borderObj.left && borderObj.right && borderObj.bottom) {
      if (borderObj.equal) {
        this.makeBorder(style, 'border', borderObj.top);
      } else {
        this.makeBorder(style, 'borderTop', borderObj.top);
        this.makeBorder(style, 'borderRight', borderObj.right);
        this.makeBorder(style, 'borderBottom', borderObj.bottom);
        this.makeBorder(style, 'borderLeft', borderObj.left);
      }
    }
  },

  applyTextShadows (style, shadows) {
    const map = shadows.map(
      (shadow) => `${shadow.x} ${shadow.y} ${shadow.blur} ${getColorString(shadow.color)}`
    );
    style.textShadow = map.toString();
  },

  applyBoxShadows (style, shadows) {
    const map = shadows.map(
      (shadow) => {
        const type = shadow.type === 'inset' ? 'inset ' : '';
        return `${type}${shadow.x} ${shadow.y} ${shadow.blur} ${shadow.spread} ${getColorString(shadow.color)}`;
      }
    );
    const str = map.toString();
    style.boxShadow = str;
  },

  parseYoutubeURL (url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&\?]*).*/;
    const match = url.match(regExp);
    let result;
    if (match && match[7].length === 11) {
      result = match[7];
    } else {
      result = false;
    }
    return result;
  },

  parseVimeoURL (url) {
    const regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
    const match = regExp.exec(url);
    let result;
    if (match && match[5].length === 9) {
      result = match[5];
    } else {
      result = false;
    }
    return result;
  },

  parseDailymotionURL (url) {
    const regExp = /^.+dailymotion.com\/((video|hub)\/([^_]+))?[^#]*(#video=([^_&]+))?/;
    const match = url.match(regExp);
    let result;
    if (match && match.length > 2) {
      result = match[5] || match[3];
    } else {
      result = false;
    }
    return result;
  },

  getOffsetRect (elem) {
    const box = elem.getBoundingClientRect();

    const body = document.body;
    const docElem = document.documentElement;

    const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    const scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    const clientTop = docElem.clientTop || body.clientTop || 0;
    const clientLeft = docElem.clientLeft || body.clientLeft || 0;

    const top = box.top + scrollTop - clientTop;
    const left = box.left + scrollLeft - clientLeft;

    return {
      top: Math.round(top),
      left: Math.round(left),
      width: Math.round(box.right - box.left),
      height: Math.round(box.bottom - box.top)
    };
  },

  limitNumber (number, min, max) {
    let result = number;

    if (number < min) {
      result = min;
    } else if (number > max) {
      result = max;
    }

    return result;
  },

  hasClass (dom, className) {
    return dom.className.indexOf(className) !== -1;
  },

  addClass (dom, className) {
    if (!this.hasClass(dom, className)) {
      dom.className = `${dom.className} ${className}`;
    }
  },

  removeClass (dom, className) {
    let str = dom.className;
    str = str.replace(` ${className}`, '');
    str = str.replace(`${className} `, '');
    dom.className = str;
  },

  getBestImageVariation (variations, width, height = 0) {
    let variationReturn = false;

    forEach(variations, (variation) => {
      if (variation.dimension.width >= width &&
          variation.dimension.height >= height &&
          (variation.dimension.width - width < 100 || variation.dimension.heigh - height < 100)) {
        variationReturn = variation;
      }
    });

    return variationReturn;
  },

  getBestImageUrl (imageId, width = 0, height = 0) {
    let result = '';

    if (imageId && imageId !== '' && typeof imageId !== 'undefined') {
      result = `/api/media/resize/${imageId}/${width}/${height}`;
    }

    return result;
  },

  parseQueryUrl (url, query) {
    let resultUrl = url;
    let count = 0;
    forEach(query, (value, key) => {
      resultUrl += count === 0 ? '?' : '&';
      resultUrl += `${key}=`;
      resultUrl += typeof value === 'object' ? JSON.stringify(value) : value;
      count ++;
    });
    return resultUrl;
  },

  parseQueryString (queryString) {
    const params = {};
    let i;
    let l;

    // Split into key/value pairs
    const queries = queryString.split('&');

    // Convert the array of strings into an object
    for (i = 0, l = queries.length; i < l; i++) {
      const temp = queries[i].split('=');
      params[temp[0]] = temp[1];
    }

    return params;
  },

  _getPropSchemaListIt (propsSchema, list, defaultLabel = '') {
    let resultList = list;
    forEach(propsSchema, (propSchema) => {
      if (!propSchema.label && defaultLabel !== '') {
        propSchema.label = defaultLabel;
      }
      resultList.push(propSchema);
      if (propSchema.unlocks) {
        if (propSchema.unlocks.constructor === Array) {
          resultList = this._getPropSchemaListIt(propSchema.unlocks, resultList, propSchema.label);
        } else {
          forEach(propsSchema.unlocks, (propSchemaUnlocks) => {
            resultList = this._getPropSchemaListIt(propSchemaUnlocks, resultList);
          });
        }
      }
    });

    return resultList;
  },

  getPropSchemaList (propsSchema) {
    return this._getPropSchemaListIt(cloneDeep(propsSchema), []);
  },


  // Filers font family into more readable state ex: source-sans-pro into source sans pro
  filterFontFamily (str) {
    return str.replace(/-/g, ' ');
  },

  // Makes a fvd more readable
  filterFVD (fvd) {
    let str = '';

    // font weight
    const weightChar = fvd.charAt(1);
    str += `${weightChar}00 `;

    // font style
    // n: normal  (default)
    // i: italic
    // o: oblique
    const styleChar = fvd.charAt(0);

    if (styleChar === 'n') {
      str += 'normal';
    } else if (styleChar === 'i') {
      str += 'italic';
    } else if (styleChar === 'o') {
      str += 'oblique';
    }

    return str;
  },

  getRGBA (hex, opacity) {
    const colr = Colr.fromHex(hex);
    const rgb = colr.toRgbObject();

    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
  },

  border (arr, size, style, color, opacity) {
    arr.border = `${size} ${style} ${utils.getRGBA(color, parseInt(opacity, 10) / 100.0)}`;
    arr.WebkitBackgroundClip = 'padding-box';
    arr.backgroundClip = 'padding-box';
  },

  isClient () {
    return typeof document !== 'undefined';
  },

  rounded (arr, corners) {
    arr.WebkitBorderRadius = corners;
    arr.MozBorderRadius = corners;
    arr.OBorderRadius = corners;
    arr.borderRadius = corners;
  },

  backgroundRGBA (arr, color, opacity) {
    arr.backgroundColor = utils.getRGBA(color, parseInt(opacity, 10) / 100.0);
  },

  transition (arr, to, time, ease) {
    const transition = `${to} ${time} ${ease}`;
    arr.transition = transition;
    arr.WebkitTransition = transition;
    arr.MozTransition = transition;
    arr.OTransition = transition;
  },

  translate (arr, x, y) {
    const translate = `translate(${x}, ${y})`;
    arr.transform = translate;
    arr.msTransform = translate;
    arr.MozTransform = translate;
    arr.WebkitTransform = translate;
    arr.OTransform = translate;
  },

  padding (arr, top, right, bottom, left) {
    arr.padding = `${top} ${right} ${bottom} ${left}`;
  },

  // Return json from a font format fvd (ex. input: i4, n4, n8 ...) https://github.com/typekit/fvd
  processFVD (style, fvd) {
    style.fontStyle = 'normal';
    style.fontWeight = 400;

    // font style
    // n: normal  (default)
    // i: italic
    // o: oblique
    const styleChar = fvd.charAt(0);

    if (styleChar === 'i') {
      style.fontStyle = 'italic';
    } else if (styleChar === 'o') {
      style.fontStyle = 'oblique';
    }

    // font weight
    const weightChar = fvd.charAt(1);
    style.fontWeight = parseInt(`${weightChar}00`, 10);
  }
};

export default utils;
