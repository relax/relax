import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql';

var colorType = new GraphQLInputObjectType({
  name: 'ColorInput',
  fields: {
    _id: {type: GraphQLID},
    label: {type: GraphQLString},
    value: {type: GraphQLString}
  }
});

export default colorType;
