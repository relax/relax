import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

import userType from './user';
import UserModel from '../../models/user';

const revisionType = new GraphQLObjectType({
  name: 'Revision',
  fields: {
    _id: {
      type: new GraphQLObjectType({
        name: 'RevisionId',
        fields: {
          _id: {type: new GraphQLNonNull(GraphQLID)},
          __v: {type: new GraphQLNonNull(GraphQLInt)}
        }
      })
    },
    date: {
      type: GraphQLInt,
      resolve ({date}) {
        return date && date.getTime();
      }
    },
    doc: {
      type: new GraphQLNonNull(GraphQLString),
      resolve (revision, params, options) {
        return JSON.stringify(revision.doc);
      }
    },
    user: {
      type: userType,
      async resolve (revision, params, options) {
        return await UserModel.findById(revision.user).exec();
      }
    }
  }
});

export default revisionType;
