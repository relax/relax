import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'Filter',
  fields: {
    property: {
      type: new GraphQLNonNull(GraphQLString)
    },
    op: {
      type: new GraphQLInputObjectType({
        name: 'FilterOp',
        fields: {
          eq: {type: GraphQLString},
          gt: {type: GraphQLString},
          lt: {type: GraphQLString},
          gte: {type: GraphQLString},
          lte: {type: GraphQLString},
          nin: {type: new GraphQLList(GraphQLString)},
          in: {type: new GraphQLList(GraphQLString)}
        }
      })
    }
  }
});
