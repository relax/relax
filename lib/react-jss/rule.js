import forEach from 'lodash.foreach';

var PREFIX = '_';
var COUNTER = 0;
var pxBlacklist = [
  'boxFlex',
  'boxFlexGroup',
  'columnCount',
  'fillOpacity',
  'flex',
  'flexGrow',
  'flexPositive',
  'flexShrink',
  'flexNegative',
  'fontWeight',
  'lineClamp',
  'lineHeight',
  'opacity',
  'order',
  'orphans',
  'strokeOpacity',
  'widows',
  'zIndex',
  'zoom'
];

export default class Rule {
  constructor (ruleName, styles, id) {
    this._name = ruleName;
    this._id = PREFIX + id;
    this._styles = styles;

    return this._id;
  }

  stylesToString (styles, selector = '') {
    var css = selector;
    css += '{';

    var followingCss = '';

    forEach(styles, (value, key) => {
      var type = typeof value;

      if (type === 'object') {
        var newSelector = selector;

        if (key.charAt(0) !== ':') {
          newSelector += ' ';
        }
        newSelector += key;

        followingCss += this.stylesToString(value, newSelector);
      } else if (value !== false && value !== null) {
        var cssProperty = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

        if (type === 'number' && pxBlacklist.indexOf(key) === -1) {
          value = value+'px';
        }

        css += cssProperty+':'+value+';';
      }
    });

    css += '}';

    return css+followingCss;
  }

  toString () {
    return this.stylesToString(this._styles, '.'+this._id);
  }
}
