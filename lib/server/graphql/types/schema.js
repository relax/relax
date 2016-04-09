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
      type: new GraphQLNonNull(GraphQLString)
    },
    type: {
      type: GraphQLString
    },
    __v: {
      type: GraphQLInt
    },
    date: {
      type: GraphQLFloat,
      resolve: ({date}) => (date && date.getTime())
    },
    updatedDate: {
      type: GraphQLFloat,
      resolve: ({updatedDate}) => (updatedDate && updatedDate.getTime())
    },
    data: {
      type: GraphQLString,
      resolve: (schema) => JSON.stringify(schema.data)
    },
    schemaLinks: {
      type: GraphQLString,
      resolve: (schema) => JSON.stringify(schema.schemaLinks)
    },
    updatedBy: {
      type: userType,
      resolve: (schema) => UserModel.findById(schema.updatedBy).exec()
    },
    createdBy: {
      type: userType,
      resolve: (schema) => UserModel.findById(schema.createdBy).exec()
    },
    properties: {
      type: GraphQLString,
      resolve: (schema) => JSON.stringify(schema.properties)
    }
  }
});

export default schemaType;
