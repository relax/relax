import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

import userType from './user';
import UserModel from '../../models/user';

var pageType = new GraphQLObjectType({
  name: 'Page',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLID)},
    slug: {type: new GraphQLNonNull(GraphQLString)},
    state: { type: GraphQLString },
    date: {
      type: GraphQLInt,
      resolve: (page) => {
        return page.date.getTime();
      }
    },
    updatedDate: {
      type: GraphQLInt,
      resolve: (page) => {
        return page.updatedDate.getTime();
      }
    },
    title: { type: GraphQLString },
    data: {
      type: GraphQLString,
      resolve: (page, params, options) => {
        return JSON.stringify(page.data);
      }
    },
    updatedBy: {
      type: userType,
      resolve: (page, params, options) => {
        return UserModel.findById(page.updatedBy).exec();
      }
    },
    createdBy: {
      type: userType,
      resolve: (page, params, options) => {
        return UserModel.findById(page.createdBy).exec();
      }
    }
  }
});

export default pageType;
