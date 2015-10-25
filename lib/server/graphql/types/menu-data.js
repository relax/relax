import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql';
import {getProjection} from 'relax-framework';

import pageType from './page';
import PageModel from '../../models/page';

const menuDataType = new GraphQLObjectType({
  name: 'MenuData',
  fields: () => ({
    id: {type: GraphQLID},
    type: {type: GraphQLString},
    page: {
      type: pageType,
      resolve (menuData, params, options) {
        const projection = getProjection(options.fieldASTs[0]);

        return PageModel
          .findById(menuData.page)
          .select(projection)
          .exec();
      }
    },
    link: {
      type: new GraphQLObjectType({
        name: 'MenuDataLink',
        fields: {
          url: {type: GraphQLString},
          label: {type: GraphQLString}
        }
      })
    },
    children: {
      type: new GraphQLList(menuDataType)
    }
  })
});

export default menuDataType;
