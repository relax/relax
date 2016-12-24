import getProjection from 'helpers/get-projection';
import {
  GraphQLList
} from 'graphql';

import authorize from '../../authorize';
import templateType from '../../types/template';
import TemplateModel from '../../../models/template';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';

export default {
  type: new GraphQLList(templateType),
  args: {
    ...paginationQueryArgs
  },
  resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    const query = TemplateModel.find(searchQuery({}, params));

    paginateQuery(query, params);

    return query.select(projection).exec();
  }
};
