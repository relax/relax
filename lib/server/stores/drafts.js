import {ServerStore} from 'relax-framework';
import DraftModel from '../models/draft';

class DraftsStore extends ServerStore {
  constructor () {
    super();
    this.Model = DraftModel;
  }

  removeMultiple (query) {
    this.Model.find(query).remove().exec();
  }
}

export default new DraftsStore();
