import get from 'lodash/get';

export default ({fragments, elementLinks, linksData, prefix = ''}) => {
  const result = {};

  // need to "listen" for attributes
  // elementLinks is an array of links
  let data = linksData;

  if (typeof data === 'string') {
    // links data is from fragments
    data = get(fragments, [data, 'doc'], {});
  }

  elementLinks.forEach((link) => {
    // properties have the format properties#user#username
    const splitted = link.property.split('#');

    let value = data;
    splitted.forEach((pathKey) => {
      value = value && value[pathKey];
    });

    // assign to map
    if (link.action === 'builderFragment') {
      result[`${prefix}${link.property}`] = value && value.Body && value.Body.children;
    } else {
      result[`${prefix}${link.property}`] = value;
    }
  });

  return result;
};
