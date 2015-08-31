import {ServerStore} from 'relax-framework';
import UserModel from '../models/user';
import Q from 'q';

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
}

export default new UsersStore();
