import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

const mediaType = new GraphQLObjectType({
  name: 'Media',
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLID)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    fileName: {type: new GraphQLNonNull(GraphQLString)},
    type: {type: new GraphQLNonNull(GraphQLString)},
    size: {type: new GraphQLNonNull(GraphQLString)},
    filesize: {type: new GraphQLNonNull(GraphQLString)},
    dimension: {
      type: new GraphQLObjectType({
        name: 'MediaDimension',
        fields: {
          width: {type: GraphQLInt},
          height: {type: GraphQLInt}
        }
      })
    },
    url: {type: new GraphQLNonNull(GraphQLString)},
    absoluteUrl: {type: new GraphQLNonNull(GraphQLString)},
    date: {
      type: GraphQLInt,
      resolve: ({date}) => {
        return date && date.getTime();
      }
    },
    thumbnail: {type: GraphQLString},
    variations: {
      type: GraphQLString,
      resolve (media, params, options) {
        return JSON.stringify(media.variations);
      }
    }
  }
});

export default mediaType;
