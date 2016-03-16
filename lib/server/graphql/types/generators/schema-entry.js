import forEach from 'lodash.foreach';
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';
import {TypesNativeGraphQL} from 'helpers/data-types/native';

import userType from '../user';
import UserModel from '../../../models/user';

export default (schema) => {
  const propertiesFields = {};
  forEach(schema.properties, (property) => {
    if (TypesNativeGraphQL[property.type]) {
      const native = TypesNativeGraphQL[property.type];
      propertiesFields[property.id] = Object.assign({}, native);
    }
  });

  return new GraphQLObjectType({
    name: `rlx_${schema.slug}`,
    fields: {
      _id: {type: new GraphQLNonNull(GraphQLID)},
      title: {type: GraphQLString},
      slug: {type: new GraphQLNonNull(GraphQLString)},
      __v: {type: GraphQLInt},
      state: {type: GraphQLString},
      date: {
        type: GraphQLInt,
        resolve ({date}) {
          return date && date.getTime();
        }
      },
      updatedDate: {
        type: GraphQLInt,
        resolve ({updatedDate}) {
          return updatedDate && updatedDate.getTime();
        }
      },
      updatedBy: {
        type: userType,
        async resolve (schemaEntry) {
          return await UserModel.findById(schemaEntry.updatedBy).exec();
        }
      },
      createdBy: {
        type: userType,
        async resolve (schemaEntry) {
          return await UserModel.findById(schemaEntry.createdBy).exec();
        }
      },
      data: {
        type: GraphQLString,
        resolve (schemaEntry) {
          return JSON.stringify(schemaEntry.data);
        }
      },
      ...propertiesFields
    }
  });
};
