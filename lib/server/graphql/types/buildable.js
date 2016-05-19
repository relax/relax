import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

import userType from './user';
import UserModel from '../../models/user';

export default new GraphQLObjectType({
  name: 'Buildable',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLID)},
    title: {type: GraphQLString},
    slug: {type: GraphQLString},
    __v: {type: GraphQLInt},
    state: {type: GraphQLString},
    date: {
      type: GraphQLFloat,
      resolve ({date}) {
        return date && date.getTime();
      }
    },
    updatedDate: {
      type: GraphQLFloat,
      resolve ({updatedDate}) {
        return updatedDate && updatedDate.getTime();
      }
    },
    updatedBy: {
      type: userType,
      async resolve (page) {
        return await UserModel.findById(page.updatedBy).exec();
      }
    },
    createdBy: {
      type: userType,
      async resolve (page) {
        return await UserModel.findById(page.createdBy).exec();
      }
    },
    data: {
      type: GraphQLString,
      resolve (page) {
        return JSON.stringify(page.data);
      }
    }
  }
});
