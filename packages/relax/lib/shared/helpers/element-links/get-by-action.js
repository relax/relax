import forEach from 'lodash/forEach';

export default (links, action) => {
  let result;

  forEach(links, (link) => {
    if (link.action === action) {
      result = link;
      return false;
    }
  });

  return result;
};
