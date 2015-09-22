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
      this.listenTo(draftActions, 'updateModel', this.updateModel);
    }
  }

  createCollection () {
    return new DraftsCollection();
  }

  updateModel (data, deferred) {
    const model = this.getModel(data.id, {update: false});
    model.set(data).trigger('change', model);
    deferred.resolve();
  }
}

export default new DraftsStore();
