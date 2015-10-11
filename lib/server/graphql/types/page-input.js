import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

var pageInputType = new GraphQLInputObjectType({
  name: 'PageInput',
  fields: {
    _id: globalIdField('Page'),
    slug: {type: GraphQLString},
    state: { type: GraphQLString },
    updatedDate: {
      type: GraphQLInt,
      resolve: () => {
        return Date.now();
      }
    },
    title: {type: GraphQLString},
    updatedBy: {type: GraphQLString}
  }
});

export default pageInputType;
