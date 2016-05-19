import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} from 'graphql';

import getModelFromType from '../get-model-from-type';
import tabItemType from './tab-item';

export default new GraphQLObjectType({
  name: 'Tab',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    _userId: {
      type: GraphQLID
    },
    type: {
      type: new GraphQLNonNull(GraphQLString)
    },
    item: {
      type: tabItemType,
      async resolve ({type, item}) {
        const Model = getModelFromType(type);
        return await Model.findById(item);
      }
    }
  }
});
