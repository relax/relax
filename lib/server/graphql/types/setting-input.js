import {
  GraphQLInputObjectType,
  GraphQLString
} from 'graphql';

var settingInputType = new GraphQLInputObjectType({
  name: 'SettingInput',
  fields: {
    _id: {type: GraphQLString},
    value: {type: GraphQLString}
  }
});

export default settingInputType;
