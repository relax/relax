import {
  GraphQLObjectType,
  GraphQLNonNull
} from 'graphql';

import pageType from './page';
import tabIdType from './tab-id';
import PageModel from '../../models/page';

export default new GraphQLObjectType({
  name: 'Tab',
  fields: {
    _id: {
      type: new GraphQLNonNull(tabIdType)
    },
    page: {
      type: pageType,
      async resolve (tab, params, options) {
        return await PageModel.findById(tab.page).exec();
      }
    }
  }
});
