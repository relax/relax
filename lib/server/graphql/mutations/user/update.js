import getProjection from 'helpers/get-projection';
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';

import authorize from '../../authorize';
import config from '../../../../../config';
import userType from '../../types/user';
import UserModel from '../../../models/user';

async function updateUser ({userId, projection, data}) {
  if (config.demo) {
    throw new Error('Update user is disabled on the demo');
  }

  const user = await UserModel
    .findByIdAndUpdate(
      userId,
      data,
      {upsert: true, new: true}
    )
    .select(projection);

  if (!user) {
    throw new Error('Error updating user');
  }

  return user;
}

export const updateUserName = {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    value: {
      name: 'value',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);

    return updateUser({
      userId: params.id,
      projection,
      data: {
        name: params.value
      }
    });
  }
};

export const updateUserUsername = {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    value: {
      name: 'value',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);

    return updateUser({
      userId: params.id,
      projection,
      data: {
        username: params.value
      }
    });
  }
};

export const updateUserEmail = {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    value: {
      name: 'value',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);

    return updateUser({
      userId: params.id,
      projection,
      data: {
        email: params.value
      }
    });
  }
};

async function setPassword (user, password) {
  return new Promise((resolve, reject) => {
    user.setPassword(password, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

export const updateUserPassword = {
  type: GraphQLBoolean,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    value: {
      name: 'value',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params) {
    authorize(root);

    if (config.demo) {
      throw new Error('Update user password is disabled on the demo');
    }

    const user = await UserModel.findById(params.id);

    if (!user) {
      throw new Error('User does not exist');
    }

    await setPassword(user, params.value);
    await user.save();

    return user;
  }
};
