import Page from '../../components/page';
import elementsStore from '../stores/elements';
import pagesStore from '../stores/pages';
import Q from 'q';

export default {
  routes: {
    ':slug': 'page'
  },
  page: function (slug) {
    Q()
      .then(() => pagesStore.findBySlug(slug))
      .then((page) => Q.all([page, elementsStore.findAll()]))
      .spread((page, elements) => {
        this.renderComponent(Page, {elements, page});
      })
      .catch((error) => {
        console.log('Error loading page: '+error);
      });
  }
};
