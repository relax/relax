import {ClientStore} from 'relax-framework';
import UsersCollection from '../collections/users';
import userActions from '../actions/user';

class UsersStore extends ClientStore {
  constructor () {
    super();
  }

  init () {
    if (this.isClient()) {
      this.listenTo(userActions, 'add', this.add);
      this.listenTo(userActions, 'remove', this.remove);
      this.listenTo(userActions, 'update', this.update);
    }
  }

  createCollection () {
    return new UsersCollection();
  }
}

export default new UsersStore();
