import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} from 'graphql';

import menuDataType from './menu-data';
import userType from './user';
import UserModel from '../../models/user';

const menuType = new GraphQLObjectType({
  name: 'Menu',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLID)},
    title: { type: GraphQLString },
    slug: {type: new GraphQLNonNull(GraphQLString)},
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
    updatedBy: {
      type: userType,
      resolve (menu, params, options) {
        return UserModel.findById(menu.updatedBy).exec();
      }
    },
    createdBy: {
      type: userType,
      resolve (menu, params, options) {
        return UserModel.findById(menu.createdBy).exec();
      }
    },
    data: {
      type: new GraphQLList(menuDataType),
      resolve (menu, params, options) {
        return menu.data;
      }
    }
  }
});

export default menuType;
