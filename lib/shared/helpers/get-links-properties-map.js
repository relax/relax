import forEach from 'lodash.foreach';

export default (schemaLinks) => {
  const propertiesLinks = {};
  if (schemaLinks) {
    forEach(schemaLinks, (links, elementId) => {
      forEach(links, (link, index) => {
        propertiesLinks[link.property] = propertiesLinks[link.property] || [];
        propertiesLinks[link.property].push({
          elementId,
          action: link.action,
          index
        });
      });
    });
  }
  return propertiesLinks;
};
