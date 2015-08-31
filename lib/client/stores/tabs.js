import {ClientStore} from 'relax-framework';
import TabsCollection from '../collections/tabs';
import tabActions from '../actions/tab';

class TabsStore extends ClientStore {
  constructor () {
    super();
  }

  init () {
    if (this.isClient()) {
      this.listenTo(tabActions, 'add', this.add);
      this.listenTo(tabActions, 'remove', this.remove);
    }
  }

  createCollection () {
    return new TabsCollection();
  }
}

export default new TabsStore();
