import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType
} from 'graphql';

import authorize from '../../authorize';
import draftType from '../../types/draft';
import pageType from '../../types/page';
import revisionType from '../../types/revision';
import updateItem from '../_helpers/update-item';
import DraftModel from '../../../models/draft';
import RevisionModel from '../../../models/revision';

export default {
  type: new GraphQLObjectType({
    name: 'PageRestore',
    fields: {
      page: {type: pageType},
      draft: {type: draftType},
      revision: {type: revisionType}
    }
  }),
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params) {
    authorize(root);

    const revision = await RevisionModel.findById(params.id);
    const result = await updateItem({
      id: revision.itemId,
      type: 'page',
      changes: revision.doc,
      userId: root.user._id
    });
    const draft = await DraftModel.findOneAndUpdate(
      {itemId: revision.itemId},
      {
        __v: result.item.__v,
        data: result.item.data,
        actions: []
      },
      {upsert: true, new: true}
    );

    return {
      page: result.item,
      revision: result.revision,
      draft
    };
  }
};
