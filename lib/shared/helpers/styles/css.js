import invariant from 'invariant';

import {getColorString, applyBackground} from './colors';

function Css (rules) {
  invariant(
    rules && typeof rules === 'object',
    'Invalid argument passed to "css", expected an object'
  );

  this.rules = rules;
}


/**
 * setProperty - sets an arbitrary css property
 *
 * @param  {String} prop
 * @param  {String|Object} value
 * @return {Css} self
 */
Css.prototype.setProperty = function setProperty (property, value) {
  if (value) {
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
  return this;
};


/**
 * setDisplay - sets the display properties
 *
 * @param  {Object} value
 * @return {Css} self
 */
Css.prototype.setDisplay = function setDisplay (value) {
  return this;
};


/**
 * setMarginPadding - sets the margin and padding properties
 *
 * @param  {Object} value
 * @return {Css} self
 */
Css.prototype.setMarginPadding = function setMarginPadding (value) {
  return this;
};


/**
 * backgroundColor - sets an arbitrary css property
 *
 * @param  {Object} color
 * @return {Css} self
 */
Css.prototype.setBackgroundColor = function setBackgroundColor (color) {
  if (color) {
    applyBackground(this.rules, color);
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
  if (border && border.top && border.left && border.right && border.bottom) {
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
