import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

import userType from './user';
import UserModel from '../../models/user';

const menuType = new GraphQLObjectType({
  name: 'Menu',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLID)},
    title: {type: GraphQLString},
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
      resolve (menu) {
        return UserModel.findById(menu.updatedBy).exec();
      }
    },
    createdBy: {
      type: userType,
      resolve (menu) {
        return UserModel.findById(menu.createdBy).exec();
      }
    },
    data: {
      type: GraphQLString,
      resolve ({data}) {
        // TODO fetch needed data from nodes
        return JSON.stringify(data);
      }
    }
  }
});

export default menuType;
