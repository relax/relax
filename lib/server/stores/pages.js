import {ServerStore} from 'relax-framework';
import PageModel from '../models/page';

class PagesStore extends ServerStore {
  constructor () {
    super();
    this.Model = PageModel;
  }

  findBySlug (slug) {
    return this.findOne({slug});
  }
}

export default new PagesStore();
