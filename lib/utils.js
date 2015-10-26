import cloneDeep from 'lodash.clonedeep';
import forEach from 'lodash.foreach';
import Colr from 'colr';
import {md5} from 'blueimp-md5';

const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/tiff', 'image/gif'];
const ICON_MIME_TYPES = ['image/vnd.microsoft.icon', 'image/x-icon'];
const VIDEO_MIME_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
const AUDIO_MIME_TYPES = ['audio/mpeg', 'audio/ogg', 'audio/wav'];

var utils = {
  getMediaType (mimeType) {
    let result = '';
    if (IMAGE_MIME_TYPES.indexOf(mimeType) !== -1) {
      result = 'image';
    } else if (ICON_MIME_TYPES.indexOf(mimeType) !== -1) {
      result = 'favicon';
    } else if (VIDEO_MIME_TYPES.indexOf(mimeType) !== -1) {
      result = 'video';
    } else if (AUDIO_MIME_TYPES.indexOf(mimeType) !== -1) {
      result = 'audio';
    }

    return result;
  },

  getGravatarImage (email, size = 100) {
    var hash = email ? md5(email.toLowerCase()) : '0';
    return 'http://www.gravatar.com/avatar/'+hash+'?d=mm&s='+size;
  },

  makeBorder (style, property, border) {
    if (border.style !== 'none' && border.width !== 0) {
      // style[property] = border.width+'px '+border.style+' '+Colors.getColorString(border.color);
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

  parseYoutubeURL (url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length === 11) {
      return match[7];
    } else {
      return false;
    }
  },

  parseVimeoURL (url) {
    var regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
    var match = regExp.exec(url);
    if (match && match[5].length === 9) {
      return match[5];
    } else {
      return false;
    }
  },

  parseDailymotionURL (url) {
    var regExp = /^.+dailymotion.com\/((video|hub)\/([^_]+))?[^#]*(#video=([^_&]+))?/;
    var match = url.match(regExp);

    if (match && match.length > 2) {
      return match[5] || match[3];
    } else {
      return false;
    }
  },

  parseColumnsDisplay (value, numChildren, multiRows, idChanged = -1) {
    var parsedValue;

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
          widthPerc: 50
        });
      }
    }

    // Check if too much
    if (parsedValue.length > numChildren) {
      let difference = parsedValue.length - numChildren;
      parsedValue.splice(-difference, difference);
    }

    // Go through all to check rules
    if (multiRows && numChildren > 1) {
      var previous = 'block', i;
      for (i = 0; i < parsedValue.length; i++) {
        if (previous === 'block' && parsedValue[i].width !== 'block') {
          if (i === numChildren - 1) {
            if (idChanged === i) {
              parsedValue[i-1].width = 'auto';
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
            (i >= 2 && parsedValue[i-2].width === 'block') ||
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
          parsedValue[i].widthPerc = 50;
        }

        previous = parsedValue[i].width;
      }
    }

    // Calculate auto widths
    var it, it1;
    for (it = 0; it < parsedValue.length; it++) {
      if (parsedValue[it].width !== 'block') {

        let countAutoColumns = 0;
        let availableAutoSpace = 100;

        for (it1 = it; it1 < parsedValue.length; it1++) {
          if ((parsedValue[it1].break && it1 !== it) || parsedValue[it1].width === 'block') {
            break;
          }

          if (parsedValue[it1].width === 'custom') {
            availableAutoSpace -= parsedValue[it1].widthPerc;
          } else if (parsedValue[it1].width === 'auto') {
            countAutoColumns ++;
          }
        }

        // calc and apply width
        if (countAutoColumns > 0) {
          let widthCalc = Math.round(availableAutoSpace / countAutoColumns * 100) / 100;

          for (it; it < it1; it++) {
            if (parsedValue[it].width === 'auto') {
              parsedValue[it].widthPerc = widthCalc;
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
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docElem = document.documentElement;

    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {
      top: Math.round(top),
      left: Math.round(left),
      width: Math.round(box.right-box.left),
      height: Math.round(box.bottom-box.top)
    };
  },

  hasClass (dom, className) {
    return dom.className.indexOf(className) !== -1;
  },

  addClass (dom, className) {
    if (!this.hasClass(dom, className)) {
      dom.className = dom.className + ' ' + className;
    }
  },

  removeClass (dom, className) {
    var str = dom.className;
    str = str.replace(' '+className, '');
    str = str.replace(className+' ', '');
    dom.className = str;
  },

  getBestImageVariation (variations, width, height = 0) {
    var variationReturn = false;

    forEach (variations, (variation) => {
      if (variation.dimension.width >= width && variation.dimension.height >= height && (variation.dimension.width - width < 100 || variation.dimension.heigh - height < 100)) {
        variationReturn = variation;
      }
    });

    return variationReturn;
  },

  getBestImageUrl (imageId, width = 0, height = 0) {
    var result = '';

    if (imageId && imageId !== '' && typeof imageId !== 'undefined') {
      result = `/api/media/resize/${imageId}/${width}/${height}`;
    }

    return result;
  },

  parseQueryUrl ( url , query ) {
    var count = 0;
    forEach(query, (value, key) => {
      url += count === 0 ? '?' : '&';
      url += key + '=';
      url += typeof value === 'object' ? JSON.stringify(value) : value;
      count ++;
    });

    return url;
  },

  parseQueryString ( queryString ) {
    var params = {}, queries, temp, i, l;

    // Split into key/value pairs
    queries = queryString.split("&");

    // Convert the array of strings into an object
    for ( i = 0, l = queries.length; i < l; i++ ) {
      temp = queries[i].split('=');
      params[temp[0]] = temp[1];
    }

    return params;
  },

  _getPropSchemaListIt (propsSchema, list, defaultLabel = '') {
    forEach(propsSchema, (propSchema) => {
      if (!propSchema.label && defaultLabel !== '') {
        propSchema.label = defaultLabel;
      }
      list.push(propSchema);
      if (propSchema.unlocks) {
        if (propSchema.unlocks.constructor === Array) {
          list = this._getPropSchemaListIt(propSchema.unlocks, list, propSchema.label);
        } else {
          forEach(propsSchema.unlocks, (propSchemaUnlocks) => {
            list = this._getPropSchemaListIt(propSchemaUnlocks, list);
          });
        }
      }
    });

    return list;
  },

  getPropSchemaList (propsSchema) {
    return this._getPropSchemaListIt(cloneDeep(propsSchema), []);
  },


  // Filers font family into more readable state ex: source-sans-pro into source sans pro
  filterFontFamily (str) {
    return str.replace(/-/g, " ");
  },

  // Makes a fvd more readable
  filterFVD (fvd) {
    var str = "";

    // font weight
    var weightChar = fvd.charAt(1);
    str += weightChar+"00 ";

    // font style
    // n: normal  (default)
    // i: italic
    // o: oblique
    var styleChar = fvd.charAt(0);

    if (styleChar === "n") {
      str += "normal";
    }
    else if (styleChar === "i") {
      str += "italic";
    }
    else if (styleChar === "o") {
      str += "oblique";
    }

    return str;
  },

  getRGBA (hex, opacity) {
    const colr = Colr.fromHex(hex);
    const rgb = colr.toRgbObject();

    return 'rgba('+rgb.r+', '+rgb.g+', '+rgb.b+', '+opacity+')';
  },

  border (arr, size, style, color, opacity) {
    arr.border = size + " " + style + " " + utils.getRGBA(color, parseInt(opacity, 10)/100.0);
    arr.WebkitBackgroundClip = "padding-box";
    arr.backgroundClip = "padding-box";
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
    arr.backgroundColor = utils.getRGBA(color, parseInt(opacity, 10)/100.0);
  },

  transition (arr, to, time, ease) {
    arr.transition = to + " " + time + " " + ease;
    arr.WebkitTransition = to + " " + time + " " + ease;
    arr.MozTransition = to + " " + time + " " + ease;
    arr.OTransition = to + " " + time + " " + ease;
  },

  translate (arr, x, y) {
    arr.transform = "translate("+x+", "+y+")";
    arr.msTransform = "translate("+x+", "+y+")";
    arr.MozTransform = "translate("+x+", "+y+")";
    arr.WebkitTransform = "translate("+x+", "+y+")";
    arr.OTransform = "translate("+x+", "+y+")";
  },

  padding (arr, top, right, bottom, left) {
    arr.padding = top+" "+right+" "+bottom+" "+left;
  },

  // Return json from a font format fvd (ex. input: i4, n4, n8 ...) https://github.com/typekit/fvd
  processFVD (style, fvd) {
    style.fontStyle = "normal";
    style.fontWeight = 400;

    // font style
    // n: normal  (default)
    // i: italic
    // o: oblique
    var styleChar = fvd.charAt(0);

    if (styleChar === "i") {
      style.fontStyle = "italic";
    }
    else if (styleChar === "o") {
      style.fontStyle = "oblique";
    }

    // font weight
    var weightChar = fvd.charAt(1);
    style.fontWeight = parseInt(weightChar+"00", 10);
  },

  getElementsSchemaLinks (schemaLinks) {
    let elementsLinks = {};
    if (schemaLinks) {
      forEach(schemaLinks, (links, propertyId) => {
        forEach(links, link => {
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

  alterSchemaElementProps (links, element, schemaEntry) {
    forEach(links, (link) => {
      if (link.action === 'children') {
        if (schemaEntry[link.propertyId] && schemaEntry[link.propertyId] !== '') {
          element.children = schemaEntry[link.propertyId];
        } else {
          element.display = false;
        }
      } else if (link.action === 'show' && (!schemaEntry[link.propertyId] || schemaEntry[link.propertyId] === '')) {
        element.display = false;
      } else if (link.action === 'hide' && schemaEntry[link.propertyId] && schemaEntry[link.propertyId] !== '') {
        element.display = false;
      } else if (link.action) { // setting
        element.props[link.action] = schemaEntry[link.propertyId];
      }
    });
  }
};

export default utils;
