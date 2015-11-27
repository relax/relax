import forEach from 'lodash.foreach';

import displays from './displays';

export default function getElementProps (element, display) {
  let elementProps = element.props;

  if (display !== 'desktop' && element.displayProps) {
    const changes = {};
    forEach(displays, (value, displayIt) => {
      if (displayIt !== 'desktop' && value >= displays[display] && element.displayProps[displayIt]) {
        Object.assign(changes, element.displayProps[displayIt]);
      }
    });
    elementProps = Object.assign({}, elementProps, changes);
  }

  return elementProps;
}
