import getProjection from 'helpers/get-projection';
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} from 'graphql';

import authorize from '../../authorize';
import templateType from '../../types/template';
import updateItem from '../_helpers/update-item';

export const updateTitle = {
  type: templateType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      name: 'title',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    authorize(root);
    const projection = getProjection(options.fieldASTs[0]);
    const {item} = await updateItem({
      id: params.id,
      type: 'template',
      changes: {title: params.title},
      projection,
      userId: root.user._id
    });
    return item;
  }
};
