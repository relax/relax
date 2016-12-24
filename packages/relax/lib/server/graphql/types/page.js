import GraphQLJSON from 'graphql-type-json';
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

import templateType from './template';
import userType from './user';
import TemplateModel from '../../models/template';
import UserModel from '../../models/user';

const pageType = new GraphQLObjectType({
  name: 'Page',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLID)},
    slug: {type: new GraphQLNonNull(GraphQLString)},
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
    title: {type: GraphQLString},
    data: {
      type: GraphQLJSON
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
    template: {
      type: templateType,
      async resolve ({template}) {
        return await TemplateModel.findById(template).exec();
      }
    }
  }
});

export default pageType;
