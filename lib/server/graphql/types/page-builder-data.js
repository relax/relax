import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLNumber,
  GraphQLList
} from 'graphql';


var pageBuilderDataType = new GraphQLObjectType({
  name: 'PageBuilderData',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString)},
    tag: { type: new GraphQLNonNull(GraphQLString) },
    children: {
      type: new GraphQLList(pageBuilderDataType),
      resolve: (page, params, options) => {
        console.log(page);
        console.log(params);
        return page.data;
      }
    }
  })
});

module.exports = pageBuilderDataType;
