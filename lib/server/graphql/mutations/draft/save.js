import GraphQLJSON from 'graphql-type-json';
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType
} from 'graphql';

import authorize from '../../authorize';
import buildableType from '../../types/buildable';
import draftType from '../../types/draft';
import revisionType from '../../types/revision';
import updateItem from '../_helpers/update-item';
import DraftModel from '../../../models/draft';

export default {
  type: new GraphQLObjectType({
    name: 'DraftSaveType',
    fields: {
      item: {type: buildableType},
      draft: {type: draftType},
      revision: {type: revisionType}
    }
  }),
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(GraphQLJSON)
    }
  },
  async resolve (root, params) {
    authorize(root);

    const data = params.data;
    const draft = await DraftModel.findById(params.id);

    const {item, revision} = await updateItem({
      id: draft.itemId,
      type: draft.type,
      changes: {data},
      userId: root.user._id
    });

    const resultDraft = await DraftModel.findByIdAndUpdate(
      params.id,
      {__v: item.__v, data, actions: []},
      {upsert: true, new: true}
    );

    return {
      item,
      revision,
      draft: resultDraft
    };
  }
};
