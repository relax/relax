import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} from 'graphql';

const filterType = new GraphQLInputObjectType({
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
          in: {type: new GraphQLList(GraphQLString)}
        }
      })
    }
  }
});

export default filterType;
