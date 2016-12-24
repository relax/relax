import GraphQLJSON from 'graphql-type-json';
import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import SchemaModel from '../../models/schema';
import TemplateModel from '../../models/template';
import UserModel from '../../models/user';
import templateType from './template';
import userType from './user';

export default new GraphQLObjectType({
  name: 'SchemaEntry',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLID)},
    title: {type: GraphQLString},
    slug: {type: GraphQLString},
    __v: {type: GraphQLInt},
    state: {type: GraphQLString},
    schemaId: {type: GraphQLID},
    schemaSlug: {
      type: GraphQLString,
      async resolve ({schemaId}) {
        if (schemaId) {
          const schema = await SchemaModel
            .findById(schemaId)
            .select('slug')
            .exec();
          return schema.slug;
        }
        return null;
      }
    },
    date: {
      type: GraphQLFloat,
      resolve ({date}) {
        return date && date.getTime();
      }
    },
    publishedDate: {
      type: GraphQLFloat,
      resolve ({publishedDate}) {
        return publishedDate && publishedDate.getTime();
      }
    },
    updatedDate: {
      type: GraphQLFloat,
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
      type: GraphQLJSON
    },
    properties: {
      type: GraphQLJSON
    },
    template: {
      type: templateType,
      async resolve ({template}) {
        return await TemplateModel.findById(template).exec();
      }
    }
  }
});
