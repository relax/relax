import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql';

import pageInputType from './page-input';

const menuDataInputType = new GraphQLInputObjectType({
  name: 'MenuDataInput',
  fields: () => ({
    id: {type: GraphQLID},
    type: {type: GraphQLString},
    page: {type: pageInputType},
    link: {type: new GraphQLInputObjectType({
      name: 'MenuDataLinkInput',
      fields: {
        url: {type: GraphQLString},
        label: {type: GraphQLString}
      }
    })},
    children: {
      type: new GraphQLList(menuDataInputType)
    }
  })
});

export default menuDataInputType;
