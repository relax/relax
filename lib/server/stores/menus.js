import {ServerStore} from 'relax-framework';
import MenuModel from '../models/menu';

class MenusStore extends ServerStore {
  constructor () {
    super();
    this.Model = MenuModel;
  }

  getDefaultQueryOptions () {
    return {
      sort: {
        _id: -1
      },
      populate: 'createdBy updatedBy data.page data.children.page data.children.children.page'
    };
  }

  findBySlug (slug, options = {}) {
    return this.findOne({slug}, options);
  }
}

export default new MenusStore();
