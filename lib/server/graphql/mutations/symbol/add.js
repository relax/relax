import {
  GraphQLNonNull
} from 'graphql';

import authorize from '../../authorize';
import symbolInputType from '../../types/symbol-input';
import symbolType from '../../types/symbol';
import SymbolModel from '../../../models/symbol';

export default {
  type: symbolType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(symbolInputType)
    }
  },
  async resolve (root, params) {
    authorize(root);

    const data = Object.assign({}, params.data, {
      data: JSON.parse(params.data.data)
    });

    const symbolModel = new SymbolModel(data);
    const newSymbol = await symbolModel.save();

    if (!newSymbol) {
      throw new Error('Error adding symbol');
    }
    return newSymbol;
  }
};
