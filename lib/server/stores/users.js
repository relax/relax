import {ServerStore} from 'relax-framework';
import UserModel from '../models/user';
import Q from 'q';
import config from '../../../config';

class UsersStore extends ServerStore {
  constructor () {
    super();
    this.Model = UserModel;
  }

  add (data) {
    var user = new UserModel({
      username: data.username,
      name: data.name,
      email: data.email
    });

    return Q()
      .then(() => Q.ninvoke(UserModel, 'register', user, data.password))
      .then(() => {
        return user.toJSON();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  remove (id) {
    if (!config.demo) {
      return super.remove(id);
    } else {
      throw new Error('Remove user is disabled on the demo');
    }
  }
}

export default new UsersStore();
