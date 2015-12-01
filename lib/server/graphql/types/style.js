import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

const styleType = new GraphQLObjectType({
  name: 'Style',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLID)},
    type: {type: new GraphQLNonNull(GraphQLString)},
    title: {type: GraphQLString},
    options: {
      type: GraphQLString,
      resolve (style, params, options) {
        return JSON.stringify(style.options);
      }
    },
    displayOptions: {
      type: GraphQLString,
      resolve (style, params, options) {
        return JSON.stringify(style.displayOptions);
      }
    }
  }
});

export default styleType;
