import forEach from 'lodash.foreach';

const PREFIX = '_';
const pxBlacklist = [
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
      const type = typeof value;

      if (type === 'object') {
        var newSelector = selector;

        if (key.charAt(0) !== ':') {
          newSelector += ' ';
        }
        newSelector += key;

        followingCss += this.stylesToString(value, newSelector);
      } else if (value !== false && value !== null) {
        const cssProperty = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        let propertyValue = value;

        if (type === 'number' && pxBlacklist.indexOf(key) === -1) {
          propertyValue += 'px';
        }

        css += cssProperty + ':' + propertyValue + ';';
      }
    });

    css += '}';

    return css + followingCss;
  }

  toString () {
    return this.stylesToString(this._styles, '.' + this._id);
  }
}
