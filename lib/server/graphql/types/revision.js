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

const revisionType = new GraphQLObjectType({
  name: 'Revision',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    version: {
      type: GraphQLInt
    },
    itemId: {
      type: GraphQLInt
    },
    date: {
      type: GraphQLFloat,
      resolve ({date}) {
        return date && date.getTime();
      }
    },
    doc: {
      type: new GraphQLNonNull(GraphQLString),
      resolve (revision) {
        return JSON.stringify(revision.doc);
      }
    },
    user: {
      type: userType,
      async resolve (revision) {
        return await UserModel.findById(revision.user).exec();
      }
    }
  }
});

export default revisionType;
