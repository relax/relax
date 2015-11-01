import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';

import draftIdInputType from './draft-id-input';

const draftInputType = new GraphQLInputObjectType({
  name: 'DraftInput',
  fields: {
    _id: {
      type: draftIdInputType
    },
    __v: {
      type: GraphQLInt
    },
    data: {
      type: GraphQLString
    },
    actions: {
      type: GraphQLString
    },
    schemaLinks: {
      type: GraphQLString
    }
  }
});

export default draftInputType;
