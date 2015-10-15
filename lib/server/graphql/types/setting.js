import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

var settingType = new GraphQLObjectType({
  name: 'Setting',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    value: {type: GraphQLString}
  }
});

export default settingType;
