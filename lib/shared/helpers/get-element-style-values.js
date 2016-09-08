import displays from 'statics/displays';
import forEach from 'lodash.foreach';

export default function getElementStyleValues (defaults, options, displayOptions, display) {
  const displayValues = {};
  if (display !== 'desktop' && displayOptions) {
    forEach(displays, (value, displayIt) => {
      if (displayIt !== 'desktop' && value >= displays[display] && displayOptions[displayIt]) {
        Object.assign(displayValues, displayOptions[displayIt]);
      }
    });

    // Strip nulls
    forEach(displayValues, (val, key) => {
      if (val === null) {
        delete displayValues[key];
      }
    });
  }

  return Object.assign({}, defaults, options, displayValues);
}
