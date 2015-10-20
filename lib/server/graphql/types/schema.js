import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} from 'graphql';

import userType from './user';
import schemaPropertyType from './schema-property';
import UserModel from '../../models/user';

var schemaType = new GraphQLObjectType({
  name: 'Schema',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLID)},
    title: { type: GraphQLString },
    slug: {type: new GraphQLNonNull(GraphQLString)},
    __v: {type: GraphQLInt},
    date: {
      type: GraphQLInt,
      resolve: ({date}) => {
        return date && date.getTime();
      }
    },
    updatedDate: {
      type: GraphQLInt,
      resolve: ({updatedDate}) => {
        return updatedDate && updatedDate.getTime();
      }
    },
    data: {
      type: GraphQLString,
      resolve: (schema, params, options) => {
        return JSON.stringify(schema.data);
      }
    },
    schemaLinks: {
      type: GraphQLString,
      resolve: (schema, params, options) => {
        return JSON.stringify(schema.schemaLinks);
      }
    },
    updatedBy: {
      type: userType,
      resolve: (schema, params, options) => {
        return UserModel.findById(schema.updatedBy).exec();
      }
    },
    createdBy: {
      type: userType,
      resolve: (schema, params, options) => {
        return UserModel.findById(schema.createdBy).exec();
      }
    },
    properties: {
      type: new GraphQLList(schemaPropertyType)
    }
  }
});

export default schemaType;
