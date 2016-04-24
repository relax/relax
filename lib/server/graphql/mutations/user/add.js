import {
  GraphQLNonNull
} from 'graphql';

import authorize from '../../authorize';
import userInputType from '../../types/user-input';
import userType from '../../types/user';
import UserModel from '../../../models/user';

async function registerUser (user, password) {
  return new Promise((resolve, reject) => {
    UserModel.register(user, password, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

export default {
  type: userType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInputType)
    }
  },
  async resolve (root, params) {
    const {username, name, email, password} = params.data;
    const user = new UserModel({
      username,
      name,
      email
    });

    const count = await UserModel.count();

    if (count > 0) {
      authorize(root);
    }

    await registerUser(user, password);

    return user;
  }
};
