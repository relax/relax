import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLNumber,
  GraphQLList
} from 'graphql';

import userType from './user';
import UserModel from '../../models/user';

//import pageBuilderDataType from './page-builder-data';

var pageType = new GraphQLObjectType({
  name: 'Page',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    slug: {type: new GraphQLNonNull(GraphQLString)},
    state: { type: GraphQLString },
    date: { type: GraphQLString },
    updatedDate: { type: GraphQLString },
    data: {
      type: GraphQLString,
      resolve: (page, params, options) => {
        return JSON.stringify(page.data);
      }
    },
    createdBy: {
      type: userType,
      resolve: (page, params, options) => {
        console.log(page);
        return UserModel.findById(page.createdBy).exec();
      }
    }
  }
});

export default pageType;
