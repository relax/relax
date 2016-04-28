import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} from 'graphql';

import tabItemType from './tab-item';
import PageModel from '../../models/page';

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
        let result = null;

        if (type === 'page') {
          result = await PageModel.findById(item).exec();
        }

        return result;
      }
    }
  }
});
