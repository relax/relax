import Q from 'q';

export default [
  // Page
  {
    path: ':slug',
    callback: (stores, render, req, next) => {
      if (req.params.slug !== 'admin' && req.params.slug !== 'api') {
        Q
          .all([
            stores.pages.findBySlug(req.params.slug),
            stores.elements.findAll(),
            stores.colors.findAll(),
            stores.styles.findAll()
          ])
          .spread((page, elements, colors, styles) => {
            if (page.state === 'published') {
              render({
                page,
                elements,
                colors,
                styles
              });
            } else {
              next();
            }
          })
          .catch(next);
      } else {
        next();
      }
    }
  },

  // Schema entry
  {
    path: ':slug/:entrySlug',
    callback: (stores, render, req, next) => {
      if (req.params.slug !== 'admin' && req.params.slug !== 'api') {
        Q()
          .then(() => stores.schemaEntries(req.params.slug))
          .then((schemaEntriesStore) => Q.all([
            schemaEntriesStore.findBySlug(req.params.entrySlug),
            stores.schemas.findBySlug(req.params.slug),
            stores.elements.findAll(),
            stores.colors.findAll(),
            stores.styles.findAll()
          ]))
          .spread((schemaEntry, schema, elements, colors, styles) => {
            if (schemaEntry._state === 'published') {
              render({
                schema,
                schemaEntry,
                elements,
                colors,
                styles
              });
            } else {
              next();
            }
          })
          .catch(next);
      } else {
        next();
      }
    }
  }
];
