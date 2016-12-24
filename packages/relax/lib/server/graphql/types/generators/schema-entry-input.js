import forEach from 'lodash/forEach';
import GraphQLJSON from 'graphql-type-json';
import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';
import {TypesNativeGraphQL} from 'helpers/data-types/native';

export default (schema) => {
  const propertiesFields = {};
  forEach(schema.properties, (property) => {
    if (TypesNativeGraphQL[property.type]) {
      const native = TypesNativeGraphQL[property.type];
      propertiesFields[property.id] = Object.assign({}, native);
    }
  });

  return new GraphQLInputObjectType({
    name: `rlx_${schema.slug}_input`,
    fields: {
      _id: {type: new GraphQLNonNull(GraphQLID)},
      title: {type: GraphQLString},
      slug: {type: GraphQLString},
      __v: {type: GraphQLInt},
      state: {type: GraphQLString},
      date: {
        type: GraphQLInt,
        resolve: () => Date.now()
      },
      updatedDate: {
        type: GraphQLInt,
        resolve: () => Date.now()
      },
      updatedBy: {type: GraphQLID},
      createdBy: {type: GraphQLID},
      data: {type: GraphQLJSON},
      ...propertiesFields
    }
  });
};
