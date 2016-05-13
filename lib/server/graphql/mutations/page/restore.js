import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType
} from 'graphql';

import authorize from '../../authorize';
import pageType from '../../types/page';
import draftType from '../../types/draft';
import revisionType from '../../types/revision';
import DraftModel from '../../../models/draft';
import RevisionModel from '../../../models/revision';
import updatePage from './helpers/update-page';

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
    const result = await updatePage(revision.itemId, revision.doc, null, root.user._id);
    const draft = await DraftModel.findOneAndUpdate(
      {itemId: revision.itemId},
      {
        __v: result.page.__v,
        data: result.page.data,
        actions: []
      },
      {upsert: true, new: true}
    );

    return {
      page: result.page,
      revision: result.revision,
      draft
    };
  }
};
