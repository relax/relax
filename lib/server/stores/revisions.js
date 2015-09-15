import {ServerStore} from 'relax-framework';
import RevisionModel from '../models/revision';

class RevisionStore extends ServerStore {
  constructor () {
    super();
    this.Model = RevisionModel;
  }

  getDefaultQueryOptions () {
    return {
      sort: {
        _id: -1
      },
      populate: 'user'
    };
  }

  removeMultiple (query) {
    this.Model.find(query).remove().exec();
  }
}

export default new RevisionStore();
