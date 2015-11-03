import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} from 'graphql';
import {getProjection} from 'relax-framework';

import revisionType from './revision';
import userType from './user';
import RevisionModel from '../../models/revision';
import UserModel from '../../models/user';

const pageType = new GraphQLObjectType({
  name: 'Page',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLID)},
    slug: {type: new GraphQLNonNull(GraphQLString)},
    __v: {type: GraphQLInt},
    state: { type: GraphQLString },
    date: {
      type: GraphQLInt,
      resolve ({date}) {
        return date && date.getTime();
      }
    },
    updatedDate: {
      type: GraphQLInt,
      resolve ({updatedDate}) {
        return updatedDate && updatedDate.getTime();
      }
    },
    title: { type: GraphQLString },
    data: {
      type: GraphQLString,
      resolve (page, params, options) {
        return JSON.stringify(page.data);
      }
    },
    updatedBy: {
      type: userType,
      async resolve (page, params, options) {
        return await UserModel.findById(page.updatedBy).exec();
      }
    },
    createdBy: {
      type: userType,
      async resolve (page, params, options) {
        return await UserModel.findById(page.createdBy).exec();
      }
    }
  }
});

export default pageType;
