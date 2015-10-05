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
      populate: 'createdBy updatedBy'
    };
  }

  findBySlug (slug, options = {}) {
    return this.findOne({slug}, options);
  }
}

export default new MenusStore();
