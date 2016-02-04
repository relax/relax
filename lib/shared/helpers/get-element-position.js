import forEach from 'lodash.foreach';

import displays from './displays';

export default function getElementPosition (element, display) {
  let elementPosition = element.position;

  if (display !== 'desktop' && element.displayPosition) {
    const changes = {};
    forEach(displays, (value, displayIt) => {
      if (displayIt !== 'desktop' && value >= displays[display] && element.displayProps[displayIt]) {
        Object.assign(changes, element.displayPosition[displayIt]);
      }
    });
    elementPosition = Object.assign({}, elementPosition, changes);
  }

  return elementPosition;
}
