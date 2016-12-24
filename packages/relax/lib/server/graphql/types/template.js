import GraphQLJSON from 'graphql-type-json';
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

const templateType = new GraphQLObjectType({
  name: 'Template',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    __v: {
      type: GraphQLInt
    },
    title: {
      type: GraphQLString
    },
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
      async resolve (template) {
        return await UserModel.findById(template.updatedBy).exec();
      }
    },
    createdBy: {
      type: userType,
      async resolve (template) {
        return await UserModel.findById(template.createdBy).exec();
      }
    },
    data: {
      type: GraphQLJSON
    },
    links: {
      type: GraphQLJSON
    }
  }
});

export default templateType;
