import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
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
