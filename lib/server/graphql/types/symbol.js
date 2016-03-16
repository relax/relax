import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

const symbolType = new GraphQLObjectType({
  name: 'Symbol',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLID)},
    title: {type: GraphQLString},
    data: {
      type: GraphQLString,
      resolve (symbol) {
        return JSON.stringify(symbol.data);
      }
    }
  }
});

export default symbolType;
