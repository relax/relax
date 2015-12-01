import path from 'path';
import rmdir from 'rimraf';
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} from 'graphql';
import {all, nfcall} from 'q';
import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import mediaType from '../../types/media';
import MediaModel from '../../../models/media';

export default {
  type: GraphQLInt,
  args: {
    ids: {
      name: 'ids',
      type: new GraphQLList(new GraphQLNonNull(GraphQLID))
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const {ids} = params;
    const promises = [];

    ids.forEach((id) => {
      if (id) {
        promises.push(nfcall(rmdir, path.join(__dirname, '../../../../../public/media', id)));
      }
    });

    await all(promises);

    const removedMedia = await MediaModel
      .remove({
        _id: {
          $in: ids
        }
      })
      .exec();

    return removedMedia.result.ok;
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

    await nfcall(rmdir, path.join(__dirname, '../../../../../public/media', id));

    const removedMedia = await MediaModel
      .findByIdAndRemove(id)
      .select(projection)
      .exec();

    return removedMedia;
  }
};
