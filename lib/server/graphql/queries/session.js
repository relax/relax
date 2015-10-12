import {
  GraphQLString
} from 'graphql';

import {getProjection} from 'relax-framework';
import sessionType from '../types/session';

export default {
  type: sessionType,
  resolve: (root, params, options) => {
    return {
      _id: '0',
      username: 'dummy',
      name: 'dummy',
      email: 'dummy'
    }
  }
};
