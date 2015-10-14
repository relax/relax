import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} from 'graphql';

import menuDataInputType from './menu-data-input';

const menuInputType = new GraphQLInputObjectType({
  name: 'MenuInput',
  fields: {
    _id: {type: GraphQLID},
    title: {type: GraphQLString},
    slug: {type: GraphQLString},
    state: {type: GraphQLString},
    date: {
      type: GraphQLInt,
      resolve: () => {
        return Date.now();
      }
    },
    updatedDate: {
      type: GraphQLInt,
      resolve: () => {
        return Date.now();
      }
    },
    updatedBy: {type: GraphQLString},
    createdBy: {type: GraphQLString},
    data: {
      type: new GraphQLList(menuDataInputType)
    }
  }
});

export default menuInputType;
