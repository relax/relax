import forEach from 'lodash/forEach';

/**
 * Checks if string is a percentage
 *
 * @param {String} str
 * @returns {Boolean} true if the string is a number ending with %
 */
export function isPercentage (str) {
  return str && /^((-){0,1}\d*\.{0,1}\d+)%$/.test(str);
}

/**
 * Snaps a value to one of the values in snaps if it's close
 *
 * @param {Number} value value to snap
 * @param {Array} snaps array of snaps values
 * @returns {Number} final value
 */
export function roundSnap (value, snaps) {
  let result = Math.round(value);

  forEach(snaps, (snap) => {
    if (value > snap - 1 && value < snap + 1) {
      result = snap;
    }
  });

  return result;
}

/**
 * Places the carret at the end of an input element
 *
 * @param {DomElement} el input dom element
 * @returns {void}
 */
export function placeCaretAtEnd (el) {
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
}

/**
 * Calculates the distance between two given points
 *
 * @param {Object} p1 Point 1
 * @param {Object} p2 Point 2
 * @returns {Number} distance
 */
export function pointsDistance (p1, p2) {
  const distX = p1.x - p2.x;
  const distY = p1.y - p2.y;

  return Math.sqrt(distX * distX + distY * distY);
}

/**
 * Calculate a point between two points by percentage
 *
 * @param {Object} p1 Point 1
 * @param {Object} p2 Point 2
 * @param {Object} perc percentage
 * @returns {Object} new point
 */
export function getPointInLineByPerc (pointA, pointB, perc) {
  // PA + t / 100 * (PA - PB)
  return {
    x: pointA.x + perc / 100 * (pointB.x - pointA.x),
    y: pointA.y + perc / 100 * (pointB.y - pointA.y)
  };
}

/**
 * Validates a Google Analytics tracking ID
 *
 * @param {String} str GA tracking ID
 * @returns {Boolean} true if the ID is valid
 */
export function validateGATrackingId (str) {
  return /(UA|YT|MO)-\d+-\d+/i.test(str);
}

/**
 * Parses a Youtube URL and returns the video ID if valid
 *
 * @param {String} url input url string
 * @returns {String} video ID if valid
 */
export function parseYoutubeURL (url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&\?]*).*/;
  const match = url.match(regExp);
  let result;
  if (match && match[7].length === 11) {
    result = match[7];
  } else {
    result = false;
  }
  return result;
}

/**
 * Parses a Vimeo URL and returns the video ID if valid
 *
 * @param {String} url input url string
 * @returns {String} video ID if valid
 */
export function parseVimeoURL (url) {
  const regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
  const match = regExp.exec(url);
  let result;
  if (match && match[5].length === 9) {
    result = match[5];
  } else {
    result = false;
  }
  return result;
}

/**
 * Parses a Dailymotion URL and returns the video ID if valid
 *
 * @param {String} url input url string
 * @returns {String} video ID if valid
 */
export function parseDailymotionURL (url) {
  const regExp = /^.+dailymotion.com\/((video|hub)\/([^_]+))?[^#]*(#video=([^_&]+))?/;
  const match = url.match(regExp);
  let result;
  if (match && match.length > 2) {
    result = match[5] || match[3];
  } else {
    result = false;
  }
  return result;
}

/**
 * Cross browser element bounding rect
 *
 * @param {DomElement} elem dom element
 * @returns {Object} rect dimensions object
 */
export function getOffsetRect (elem) {
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
}

/**
 * Limits a number between a range
 *
 * @param {Number} number number to limit
 * @param {Number} min minimum limit
 * @param {Number} max maximum limit
 * @returns {Number} resulting limited value
 */
export function limitNumber (number, min, max) {
  let result = number;

  if (number < min) {
    result = min;
  } else if (number > max) {
    result = max;
  }

  return result;
}

/**
 * Checks if a dom element has a class
 *
 * @param {DomElement} dom dom element
 * @param {String} className class name string to check
 * @returns {Boolean} returns true if it class is present in dom element
 */
export function hasClass (dom, className) {
  return dom.className.indexOf(className) !== -1;
}

/**
 * Adds a class to dom element
 *
 * @param {DomElement} dom dom element
 * @param {String} className class name string to add
 * @returns {void}
 */
export function addClass (dom, className) {
  if (!this.hasClass(dom, className)) {
    dom.className = `${dom.className} ${className}`;
  }
}

/**
 * Removes a class from a dom element
 *
 * @param {DomElement} dom dom element
 * @param {String} className class name string to remove
 * @returns {void}
 */
export function removeClass (dom, className) {
  let str = dom.className;
  str = str.replace(` ${className}`, '');
  str = str.replace(`${className} `, '');
  dom.className = str;
}

/**
 * Calculates an image url based on id and size
 *
 * @param {String} imageId image ID
 * @param {Number} width minimum width desired
 * @param {Number} height minimum height desired
 * @returns {String} Image url
 */
export function getBestImageUrl (imageId, width = 0, height = 0) {
  let result = '';

  if (imageId && imageId !== '' && typeof imageId !== 'undefined') {
    result = `/api/media/resize/${imageId}/${width}/${height}`;
  }

  return result;
}

/**
 * Filers font family into more readable state
 * ex: "source-sans-pro" into "source sans pro"
 *
 * @param {String} str font family string
 * @returns {String} readeable font family
 */
export function filterFontFamily (str) {
  return str.replace(/-/g, ' ');
}

/**
 * Makes a fvd more readable
 *
 * @param {String} fvd fvd string
 * @returns {String} readeable fvd format
 */
export function filterFVD (fvd) {
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
}

/**
 * Mutates a style with the passed fvd info
 * (ex. input: i4, n4, n8 ...) https://github.com/typekit/fvd
 *
 * @param {Object} style style object to mutate
 * @param {String} fvd fvd string
 * @returns {void}
 */
export function processFVD (style, fvd) {
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
