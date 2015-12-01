import forEach from 'lodash.foreach';

import displays from './displays';

export default function getElementStyleValues (defaults, options, displayOptions, display) {
  const displayValues = {};
  if (display !== 'desktop' && displayOptions) {
    forEach(displays, (value, displayIt) => {
      if (displayIt !== 'desktop' && value >= displays[display] && displayOptions[displayIt]) {
        Object.assign(displayValues, displayOptions[displayIt]);
      }
    });
  }

  return Object.assign({}, defaults, options, displayValues);
}
