import GraphQLJSON from 'graphql-type-json';
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
    data: {type: GraphQLJSON}
  }
});

export default symbolInputType;
