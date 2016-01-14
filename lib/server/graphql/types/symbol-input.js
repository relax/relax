import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql';

const symbolInputType = new GraphQLInputObjectType({
  name: 'SymbolInput',
  fields: {
    _id: {type: GraphQLID},
    title: {type: GraphQLString},
    data: {type: GraphQLString}
  }
});

export default symbolInputType;
