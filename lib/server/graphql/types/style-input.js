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
    options: {type: GraphQLString},
    displayOptions: {type: GraphQLString}
  }
});

export default styleInputType;
