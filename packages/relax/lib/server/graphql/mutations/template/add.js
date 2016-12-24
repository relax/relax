import getUniqueSlug from 'helpers/get-unique-slug';
import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import authorize from '../../authorize';
import templateType from '../../types/template';
import TemplateModel from '../../../models/template';

export default {
  type: templateType,
  args: {
    title: {
      name: 'title',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params) {
    authorize(root);

    const templateData = {
      title: params.title
    };

    // Generate slug
    templateData.slug = await getUniqueSlug(TemplateModel, templateData.title);

    // Add user info
    templateData.createdBy = root.user._id;
    templateData.updatedBy = root.user._id;

    const templateModel = new TemplateModel(templateData);
    const template = await templateModel.save();

    if (!template) {
      throw new Error('Error creating template');
    }

    return template;
  }
};
