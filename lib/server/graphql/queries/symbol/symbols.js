import {
  GraphQLList
} from 'graphql';
import {getProjection} from 'relax-framework';

import symbolType from '../../types/symbol';
import SymbolModel from '../../../models/symbol';

export default {
  type: new GraphQLList(symbolType),
  args: {},
  resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);
    return SymbolModel.find().select(projection).exec();
  }
};
