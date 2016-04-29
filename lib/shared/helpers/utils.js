import cloneDeep from 'lodash.clonedeep';
import forEach from 'lodash.foreach';
import Colr from 'colr';

import {getColorString} from './colors';

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

  parseColumnsDisplay (value, numChildren, multiRows, idChanged = -1) {
    let parsedValue;

    if (value && value.constructor === Array) {
      parsedValue = value;
    } else {
      parsedValue = [];
    }

    // Check missing
    if (parsedValue.length < numChildren) {
      let difference = numChildren - parsedValue.length;

      for (difference; difference > 0; difference--) {
        parsedValue.push({
          width: multiRows ? 'block' : 'auto',
          break: false,
          widthPerc: '50%'
        });
      }
    }

    // Check if too much
    if (parsedValue.length > numChildren) {
      const difference = parsedValue.length - numChildren;
      parsedValue.splice(-difference, difference);
    }

    // Go through all to check rules
    if (multiRows && numChildren > 1) {
      let previous = 'block';
      let i;
      for (i = 0; i < parsedValue.length; i++) {
        if (previous === 'block' && parsedValue[i].width !== 'block') {
          if (i === numChildren - 1) {
            if (idChanged === i) {
              parsedValue[i - 1].width = 'auto';
            } else {
              parsedValue[i].width = 'block';
            }
          } else if (parsedValue[i + 1].width === 'block') {
            if (idChanged === i) {
              parsedValue[i + 1].width = 'auto';
            } else {
              parsedValue[i].width = 'block';
            }
          }
        }

        if (parsedValue[i].width === 'block' ||
            previous === 'block' ||
            (i >= 2 && parsedValue[i - 2].width === 'block') ||
            i === parsedValue.length - 1) {
          parsedValue[i].break = false;
        }

        if (parsedValue[i].break && i < parsedValue.length - 1) {
          if (parsedValue[i + 1].width === 'block') {
            if (idChanged === i + 1) {
              parsedValue[i].break = false;
            } else {
              parsedValue[i + 1].width = 'auto';
            }
          }
        }

        if (!parsedValue[i].widthPerc) {
          parsedValue[i].widthPerc = '50%';
        }

        previous = parsedValue[i].width;
      }
    }

    // Calculate auto widths
    let it;
    let it1;
    for (it = 0; it < parsedValue.length; it++) {
      if (parsedValue[it].width !== 'block') {
        let countAutoColumns = 0;
        let availableAutoSpace = 100;

        for (it1 = it; it1 < parsedValue.length; it1++) {
          if ((parsedValue[it1].break && it1 !== it) || parsedValue[it1].width === 'block') {
            break;
          }

          if (parsedValue[it1].width === 'custom') {
            availableAutoSpace -= parseInt(parsedValue[it1].widthPerc, 10);
          } else if (parsedValue[it1].width === 'auto') {
            countAutoColumns ++;
          }
        }

        // calc and apply width
        if (countAutoColumns > 0) {
          const widthCalc = Math.round(availableAutoSpace / countAutoColumns * 100) / 100;

          for (it; it < it1; it++) {
            if (parsedValue[it].width === 'auto') {
              parsedValue[it].widthPerc = `${widthCalc}%`;
            }
          }

          it--;
        } else {
          it = it1 - 1;
        }
      }
    }

    return parsedValue;
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
  },

  getElementsSchemaLinks (schemaLinks) {
    const elementsLinks = {};
    if (schemaLinks) {
      forEach(schemaLinks, (links, propertyId) => {
        forEach(links, (link) => {
          elementsLinks[link.elementId] = elementsLinks[link.elementId] || [];
          elementsLinks[link.elementId].push({
            propertyId,
            action: link.action
          });
        });
      });
    }
    return elementsLinks;
  },

  alterSchemaElementProps (links, element, schemaEntry, elementProps = {}) {
    const changes = {};
    forEach(links, (link) => {
      const splitted = link.propertyId.split('#');
      let schemaEntryValue = schemaEntry;
      forEach(splitted, (pathKey) => {
        schemaEntryValue = schemaEntryValue[pathKey];
      });

      if (link.action === 'children') {
        if (schemaEntryValue) {
          changes.children = schemaEntryValue;
        } else {
          changes.display = false;
        }
      } else if (link.action === 'show' && (!schemaEntryValue || schemaEntryValue === '')) {
        changes.display = false;
      } else if (link.action === 'hide' && schemaEntryValue && schemaEntryValue !== '') {
        changes.display = false;
      } else if (link.action) { // setting
        elementProps[link.action] = schemaEntryValue;
      }
    });
    return Object.assign({}, element, changes);
  }
};

export default utils;
