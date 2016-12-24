import getProjection from 'helpers/get-projection';
import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import templateType from '../../types/template';
import TemplateModel from '../../../models/template';

export default {
  type: templateType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);
    return await TemplateModel.findById(params.id).select(projection).exec();
  }
};
