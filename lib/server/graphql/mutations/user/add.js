import {
  GraphQLNonNull
} from 'graphql';
import Q from 'q';

import authorize from '../../authorize';
import userType from '../../types/user';
import userInputType from '../../types/user-input';
import UserModel from '../../../models/user';

export default {
  type: userType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInputType)
    }
  },
  resolve (root, params, options) {
    const {username, name, email, password} = params.data;
    const user = new UserModel({
      username,
      name,
      email
    });

    return Q()
      .then(() => UserModel.count().exec())
      .then((count) => {
        if (count > 0) {
          authorize(root);
        }
      })
      .then(() => Q.ninvoke(UserModel, 'register', user, password))
      .then(() => {
        return user;
      });
  }
};
