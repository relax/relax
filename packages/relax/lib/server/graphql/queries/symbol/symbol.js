import getProjection from 'helpers/get-projection';
import {GraphQLID} from 'graphql';
import {Types} from 'mongoose';

import symbolType from '../../types/symbol';
import SymbolModel from '../../../models/symbol';

export default {
  type: symbolType,
  args: {
    id: {
      name: 'id',
      type: GraphQLID
    }
  },
  resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);
    const _id = new Types.ObjectId(params.id);

    return SymbolModel.findById(_id).select(projection).exec();
  }
};
