import GraphQLJSON from 'graphql-type-json';
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

import userType from './user';
import UserModel from '../../models/user';

const schemaType = new GraphQLObjectType({
  name: 'Schema',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: GraphQLString
    },
    slug: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    date: {
      type: GraphQLFloat,
      resolve: ({date}) => (date && date.getTime())
    },
    updatedDate: {
      type: GraphQLFloat,
      resolve: ({updatedDate}) => (updatedDate && updatedDate.getTime())
    },
    updatedBy: {
      type: userType,
      resolve: (schema) => UserModel.findById(schema.updatedBy).exec()
    },
    createdBy: {
      type: userType,
      resolve: (schema) => UserModel.findById(schema.createdBy).exec()
    },
    data: {
      type: GraphQLJSON
    },
    schemaLinks: {
      type: GraphQLJSON
    },
    properties: {
      type: GraphQLJSON
    }
  }
});

export default schemaType;
