import forEach from 'lodash.foreach';

import calculateElement from './element';

/**
 * Traverses a relax element childrens array
 *
 * @param   {Array} children - children ids array
 * @param   {String} context - current context
 * @param   {Object} options
 * @param   {Function} callback
 * @returns {Array} rendered
 */
export default function traverseChildren ({children, context, links, data, entry, editable}, settings, callback) {
  const {editing} = settings;
  let result;

  if (children instanceof Array) {
    result = [];
    forEach(children, (elementId, position) => {
      // Calculate final element form
      const calculated = calculateElement({
        elementId,
        context,
        data,
        entry,
        links,
        position,
        editable
      }, settings);

      // Check children
      let elementChildren = calculated.children;
      if (calculated.children && calculated.children.constructor === Array) {
        const contextChanged = context !== calculated.context;

        elementChildren = traverseChildren({
          children: calculated.children,
          context: calculated.context,
          links: contextChanged ? null : links,
          data: contextChanged ? entry[calculated.context] : data,
          entry,
          editable: contextChanged && editing ? true : editable
        }, settings, callback);
      }

      // callback to render this element
      result.push(callback(calculated, elementChildren));
    });
  } else {
    result = children;
  }

  return result;
}
