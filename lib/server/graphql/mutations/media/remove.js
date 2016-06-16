import getProjection from 'helpers/get-projection';
import path from 'path';
import rmdir from 'rimraf';
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} from 'graphql';
import {promisify, all} from 'bluebird';

import authorize from '../../authorize';
import mediaType from '../../types/media';
import MediaModel from '../../../models/media';

const rmdirAsync = promisify(rmdir);
const mediaPath = './public/media';

export default {
  type: new GraphQLList(mediaType),
  args: {
    ids: {
      name: 'ids',
      type: new GraphQLList(new GraphQLNonNull(GraphQLID))
    }
  },
  async resolve (root, params) {
    authorize(root);

    const {ids} = params;

    await all(ids, id => rmdirAsync(path.join(mediaPath, id)));

    const removedMedia = await MediaModel.remove({
      _id: {
        $in: ids
      }
    });

    return removedMedia.result.ok && ids.map(_id => ({_id})) || [];
  }
};

export const removeMediaItem = {
  type: mediaType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const {id} = params;
    const projection = getProjection(options.fieldASTs[0]);

    await rmdirAsync(path.join(mediaPath, id));

    const removedMedia = await MediaModel
      .findByIdAndRemove(id)
      .select(projection)
      .exec();

    return removedMedia;
  }
};
