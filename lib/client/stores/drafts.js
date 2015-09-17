import {ClientStore} from 'relax-framework';
import DraftsCollection from '../collections/drafts';
import draftActions from '../actions/draft';

class DraftsStore extends ClientStore {
  constructor () {
    super();
  }

  init () {
    if (this.isClient()) {
      this.listenTo(draftActions, 'remove', this.remove);
      this.listenTo(draftActions, 'update', this.update);
    }
  }

  createCollection () {
    return new DraftsCollection();
  }
}

export default new DraftsStore();
