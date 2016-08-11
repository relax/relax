import getProjection from 'helpers/get-projection';
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} from 'graphql';

import authorize from '../../authorize';
import userType from '../../types/user';
import UserModel from '../../../models/user';

async function updateUser ({userId, projection, data}) {
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
