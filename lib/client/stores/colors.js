import {ClientStore} from 'relax-framework';
import ColorsCollection from '../collections/colors';
import colorActions from '../actions/colors';

class ColorsStore extends ClientStore {
  constructor () {
    super();
  }

  init () {
    if (this.isClient()) {
      this.listenTo(colorActions, 'add', this.add);
      this.listenTo(colorActions, 'remove', this.remove);
      this.listenTo(colorActions, 'update', this.update);
    }
  }

  createCollection () {
    return new ColorsCollection();
  }

}

export default new ColorsStore();
