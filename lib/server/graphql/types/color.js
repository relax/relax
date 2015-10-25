import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

const colorType = new GraphQLObjectType({
  name: 'Color',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLID)},
    label: {type: GraphQLString},
    value: {type: GraphQLString}
  }
});

export default colorType;
