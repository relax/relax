import {ServerStore} from 'relax-framework';
import TabModel from '../models/tab';

class TabsStore extends ServerStore {
  constructor () {
    super();
    this.Model = TabModel;
  }

  getDefaultQueryOptions () {
    return {
      populate: [
        {
          path: 'page',
          select: 'title slug'
        },
        {
          path: 'userSchema',
          select: 'title slug'
        }
      ]
    };
  }

  removeMultiple (query) {
    this.Model.find(query).remove().exec();
  }
}

export default new TabsStore();
