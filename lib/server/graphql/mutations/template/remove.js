import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import cleanItemRefs from '../_helpers/clean-item-refs';
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
  async resolve (root, params) {
    authorize(root);

    const removedTemplate = await TemplateModel.findByIdAndRemove(params.id);

    if (!removedTemplate) {
      throw new Error('Template not found');
    }

    await cleanItemRefs(removedTemplate._id);

    return removedTemplate;
  }
};
