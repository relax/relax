import {ServerStore} from 'relax-framework';
import PageModel from '../models/page';

class PagesStore extends ServerStore {
  constructor () {
    super();
    this.Model = PageModel;
  }

  findAll (options = {}) {
    options.projection = {
      title: true,
      slug: true,
      state: true,
      date: true
    };

    return super.findAll(options);
  }

  findBySlug (slug) {
    return this.findOne({slug});
  }
}

export default new PagesStore();
