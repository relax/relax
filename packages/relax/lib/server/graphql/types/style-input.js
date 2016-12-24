import GraphQLJSON from 'graphql-type-json';
import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql';

const styleInputType = new GraphQLInputObjectType({
  name: 'StyleInput',
  fields: {
    _id: {type: GraphQLID},
    title: {type: GraphQLString},
    type: {type: GraphQLString},
    options: {type: GraphQLJSON},
    displayOptions: {type: GraphQLJSON}
  }
});

export default styleInputType;
