import getProjection from 'helpers/get-projection';
import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import mediaType from '../../types/media';
import MediaModel from '../../../models/media';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';

export default {
  type: new GraphQLList(mediaType),
  args: {
    ...paginationQueryArgs
  },
  async resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    const query = MediaModel.find(searchQuery({}, params));

    paginateQuery(query, params);

    return query.select(projection).exec();
  }
};

export const mediaItem = {
  type: mediaType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);
    const query = MediaModel.findById(params.id);

    return query.select(projection).exec();
  }
};
