import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

export default new GraphQLObjectType({
  name: 'TabItem',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    title: {
      type: GraphQLString
    }
  }
});
