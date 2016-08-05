import forEach from 'lodash.foreach';

/**
 * Processes an elements links, returning the results
 *
 * @param   elementLinks {Array}
 * @param   elementProps {Object}
 * @param   values {Object}
 */
export default ({element, elementProps, elementLinks, values, renderChildren}) => {
  let display = true;
  let children;
  let context;
  let resultElement = element;

  forEach(elementLinks, (link) => {
    // properties have the format properties#user#username
    const splitted = link.property.split('#');

    let value = values;
    forEach(splitted, (pathKey) => {
      value = value && value[pathKey];
    });

    switch (link.action) {
      // change element children (text)
      case 'children':
        if (value) {
          resultElement = Object.assign({}, element, {
            children: value
          });
          elementProps.children = value;
        } else {
          display = false;
        }
        break;

      // show element only if value "true"
      case 'show':
        if (!value) {
          display = false;
        }
        break;

      // hide element only if value "true"
      case 'hide':
        if (value) {
          display = false;
        }
        break;

      // change element children (page builder data)
      case 'builderFragment':
        context = link.property;
        resultElement = Object.assign({}, element, {
          id: 'body',
          children: []
        });
        children = value && value.body && value.body.children && renderChildren(value.body.children, {
          context
        });
        break;

      // change some element prop
      default:
        elementProps[link.action] = value;
    }
  });

  return {
    element: resultElement,
    elementProps,
    display,
    children,
    context
  };
};
