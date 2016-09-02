import displays from 'statics/displays';
import forEach from 'lodash.foreach';

export default function getElementCss (element, display) {
  let elementCss = element.css || {};

  if (display !== 'desktop' && element.displayCss) {
    const changes = {};
    forEach(displays, (value, displayIt) => {
      if (displayIt !== 'desktop' && value >= displays[display] && element.displayCss[displayIt]) {
        Object.assign(changes, element.displayCss[displayIt]);
      }
    });
    elementCss = Object.assign({}, elementCss, changes);
  }

  return elementCss;
}
