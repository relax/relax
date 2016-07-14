import getProjection from 'helpers/get-projection';
import GraphQLJSON from 'graphql-type-json';
import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import symbolType from '../../types/symbol';
import SymbolModel from '../../../models/symbol';

export default {
  type: symbolType,
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
  async resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    const symbol = SymbolModel
      .findByIdAndUpdate(
        params.id,
        {data: params.data},
        {upsert: true, new: true}
      )
      .select(projection);

    if (!symbol) {
      throw new Error('Error udpating symbol');
    }
    return symbol;
  }
};
