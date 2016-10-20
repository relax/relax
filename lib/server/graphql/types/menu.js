import {
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import GraphQLJSON from 'graphql-type-json';
import PageModel from '../../models/page';
import UserModel from '../../models/user';
import forEach from 'lodash.foreach';
import userType from './user';

const menuType = new GraphQLObjectType({
  name: 'Menu',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLID)},
    title: {type: GraphQLString},
    date: {
      type: GraphQLFloat,
      resolve ({date}) {
        return date && date.getTime();
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
      resolve (menu) {
        return UserModel.findById(menu.updatedBy).exec();
      }
    },
    createdBy: {
      type: userType,
      resolve (menu) {
        return UserModel.findById(menu.createdBy).exec();
      }
    },
    data: {
      type: GraphQLJSON,
      resolve ({data}) {
        const promises = [];

        if (data) {
          forEach(data, (entry, id) => {
            if (entry.type === 'page') {
              promises.push(
                PageModel
                  .findById(entry.typeProps.pageId)
                  .lean()
                  .exec()
                  .then((page) => {
                    if (page) {
                      data[id].url = `/${page.slug}`;
                      data[id].label = page.title;
                    } else {
                      data[id].removed = true;
                    }

                    return data;
                  })
              );
            }
          });
        }

        let result = data;
        if (promises.length) {
          result = Promise
            .all(promises)
            .then(() => data);
        }

        return result;
      }
    }
  }
});

export default menuType;
