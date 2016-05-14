import {GraphQLInt} from 'graphql';

import TemplateModel from '../../../models/template';

export default {
  type: GraphQLInt,
  args: {},
  async resolve () {
    return TemplateModel.count();
  }
};
