import invariant from 'invariant';
import utils from 'helpers/utils';

import {getColorString, applyBackground} from './colors';

function Css (rules) {
  invariant(
    rules && typeof rules === 'object',
    'Invalid argument passed to "css", expected an object'
  );

  this.rules = rules;
  this.valid = true;
}


/**
 * when - sets a valid flag to make conditional sets
 *
 * @param  {Boolean} result
 * @return {Css} self
 */
Css.prototype.when = function when (result) {
  this.valid = !!result;
  return this;
};


/**
 * setProperty - sets an arbitrary css property
 *
 * @param  {String} prop
 * @param  {String|Object} value
 * @return {Css} self
 */
Css.prototype.setProperty = function setProperty (property, value) {
  if (this.valid && value) {
    this.rules[property] = value;
  }

  return this;
};


/**
 * setPosition - sets the position properties
 *
 * @param  {Object} value
 * @return {Css} self
 */
Css.prototype.setPosition = function setPosition (value) {
  if (this.valid && value && value.position !== 'static') {
    Object.assign(this.rules, value);
  }

  return this;
};


/**
 * setDisplay - sets the display properties
 *
 * @param  {Object} value
 * @return {Css} self
 */
Css.prototype.setDisplay = function setDisplay (value) {
  if (this.valid && value) {
    Object.assign(this.rules, value);
  }

  return this;
};


/**
 * setMarginPadding - sets the margin and padding properties
 *
 * @param  {Object} value
 * @return {Css} self
 */
Css.prototype.setMarginPadding = function setMarginPadding (value) {
  if (this.valid && value) {
    Object.assign(this.rules, value);
  }

  return this;
};


/**
 * setMargin - sets the margin properties
 *
 * @param  {Object} value
 * @return {Css} self
 */
Css.prototype.setMargin = function setMargin (value) {
  if (this.valid && value) {
    Object.assign(this.rules, {
      marginTop: value['margin-top'],
      marginBottom: value['margin-bottom'],
      marginLeft: value['margin-left'],
      marginRight: value['margin-right']
    });
  }

  return this;
};


/**
 * setMargin - sets the margin properties
 *
 * @param  {Object} value
 * @return {Css} self
 */
Css.prototype.setPadding = function setPadding (value) {
  if (this.valid && value) {
    Object.assign(this.rules, {
      paddingTop: value['padding-top'],
      paddingBottom: value['padding-bottom'],
      paddingLeft: value['padding-left'],
      paddingRight: value['padding-right']
    });
  }

  return this;
};


/**
 * setBackgroundColor - sets an arbitrary css property
 *
 * @param  {Object} color
 * @return {Css} self
 */
Css.prototype.setBackgroundColor = function setBackgroundColor (color) {
  if (this.valid && color) {
    applyBackground(this.rules, color);
  }

  return this;
};


/**
 * setColor - sets the color property
 *
 * @param  {Object} color
 * @return {Css} self
 */
Css.prototype.setColor = function setColor (color) {
  if (this.valid && color) {
    this.rules.color = getColorString(color);
  }

  return this;
};


/**
 * setPlaceholderColor - sets the placeholder color property
 *
 * @param  {Object} color
 * @return {Css} self
 */
Css.prototype.setPlaceholderColor = function setPlaceholderColor (color) {
  if (this.valid && color) {
    const colorStr = getColorString(color);
    Object.assign(this.rules, {
      '::-webkit-input-placeholder': {
        color: colorStr
      },
      ':-moz-placeholder': {
        color: colorStr
      },
      '::-moz-placeholder': {
        color: colorStr
      },
      ':-ms-input-placeholder': {
        color: colorStr
      }
    });
  }

  return this;
};


/**
 * setBoxShadows - sets the box shadow property
 *
 * @param  {Object} color
 * @return {Css} self
 */
Css.prototype.setBoxShadows = function setBoxShadows (shadows) {
  if (this.valid && shadows && shadows.length) {
    const map = shadows.map(
      (shadow) => {
        const type = shadow.type === 'inset' ? 'inset ' : '';
        return `${type}${shadow.x} ${shadow.y} ${shadow.blur} ${shadow.spread} ${getColorString(shadow.color)}`;
      }
    );

    this.rules.boxShadow = map.toString();
  }

  return this;
};


/**
 * setTextShadows - sets text shadow
 *
 * @param  {Object} shadows
 * @return {Css} self
 */
Css.prototype.setTextShadows = function setTextShadows (shadows) {
  if (this.valid && shadows && shadows.length) {
    const map = shadows.map(
      (shadow) => `${shadow.x} ${shadow.y} ${shadow.blur} ${getColorString(shadow.color)}`
    );

    this.rules.textShadow = map.toString();
  }

  return this;
};


/**
 * setFont - sets the font from a relax font object
 *
 * @param  {Object} font
 * @return {Css} self
 */
Css.prototype.setFont = function setFont (font) {
  if (this.valid && font && font.family && font.fvd) {
    this.rules.fontFamily = font.family;
    utils.processFVD(this.rules, font.fvd);
  }

  return this;
};


/**
 * makeBorder - border helping function
 *
 * @param  {Object} style
 * @param  {String} property
 * @param  {Object} border
 */
function makeBorder (style, property, border) {
  if (border && border.style !== 'none' && border.width !== 0) {
    style[property] = `${border.width}px ${border.style} ${getColorString(border.color)}`;
  }
}

/**
 * setBorder - sets a border css property
 *
 * @param  {Object} border
 * @return {Css} self
 */
Css.prototype.setBorder = function setBorder (border) {
  if (this.valid && border && border.top && border.left && border.right && border.bottom) {
    if (border.equal) {
      makeBorder(this.rules, 'border', border.top);
    } else {
      makeBorder(this.rules, 'borderTop', border.top);
      makeBorder(this.rules, 'borderRight', border.right);
      makeBorder(this.rules, 'borderBottom', border.bottom);
      makeBorder(this.rules, 'borderLeft', border.left);
    }
  }

  return this;
};

export default (rules) => new Css(rules);
