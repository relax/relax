import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import templateType from '../../types/template';
import RevisionModel from '../../../models/revision';
import TabModel from '../../../models/tab';
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

    await TabModel.find({item: params.id}).remove();
    await RevisionModel.find({itemId: params.id}).remove();

    return removedTemplate;
  }
};
