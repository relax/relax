import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql';

const colorInputType = new GraphQLInputObjectType({
  name: 'ColorInput',
  fields: {
    _id: {type: GraphQLID},
    label: {type: GraphQLString},
    value: {type: GraphQLString}
  }
});

export default colorInputType;
