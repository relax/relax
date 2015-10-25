import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';

const schemaPropertyType = new GraphQLObjectType({
  name: 'SchemaProperty',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    type: {
      type: new GraphQLNonNull(GraphQLString)
    },
    props: {
      type: GraphQLString,
      resolve (schemaProperty, params, options) {
        return JSON.stringify(schemaProperty.props);
      }
    },
    default: {
      type: GraphQLString
    },
    required: {
      type: GraphQLBoolean
    },
    dependencies: {
      type: GraphQLString,
      resolve (schemaProperty, params, options) {
        return JSON.stringify(schemaProperty.dependencies);
      }
    }
  }
});

export default schemaPropertyType;
