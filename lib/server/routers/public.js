import {Router} from 'express';
import {elements, pages} from '../stores';

var frontendRouter = new Router();

frontendRouter.get('/:slug', (req, res, next) => {
  res.locals.footer.push({
    tag: 'script',
    props: {
      src: '/js/public.js'
    }
  });

  var page;
  pages
    .findBySlug(req.params.slug)
    .then((_page) => {
      page = _page;
      return elements.findAll();
    })
    .then((elements) => {
      res.render('page/index.jsx', {elements, page});
    })
    .catch(next);
});

export default frontendRouter;
