import GraphQLJSON from 'graphql-type-json';
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

import templateType from './template';
import userType from './user';
import TemplateModel from '../../models/template';
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
    properties: {
      type: GraphQLJSON
    },
    template: {
      type: templateType,
      async resolve ({template}) {
        return await TemplateModel.findById(template);
      }
    }
  }
});

export default schemaType;
