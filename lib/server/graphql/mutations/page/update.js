import {
  GraphQLNonNull
} from 'graphql';
import pageType from '../../types/page';
import pageInputType from '../../types/page-input';

export default {
  type: pageType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(pageInputType)
    }
  },
  resolve (root, params, options) {
    return params.data;
  }
};
