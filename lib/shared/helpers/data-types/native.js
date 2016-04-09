import {
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';
import {Schema} from 'mongoose';

export const TypesNative = {
  String,
  Number,
  Boolean,
  Color: Schema.Types.Mixed,
  Font: String,
  Html: String,
  Icon: String,
  Image: String,
  Select: String,
  Pixels: Number,
  Percentage: Number,
  Padding: String,
  Margin: String,
  Corners: String
};

export const TypesNativeGraphQL = {
  String: {type: GraphQLString},
  Number: {type: GraphQLInt},
  Boolean: {type: GraphQLBoolean},
  Color: {type: GraphQLString}, // TODO change to color option object
  Font: {type: GraphQLString}, // TODO check structure
  Html: {type: GraphQLString},
  Icon: {type: GraphQLString},
  Image: {type: GraphQLString},
  Select: {type: GraphQLString},
  Pixels: {type: GraphQLInt},
  Percentage: {type: GraphQLInt},
  Padding: {type: GraphQLString},
  Margin: {type: GraphQLString},
  Corners: {type: GraphQLString}
};

export default {
  TypesNative,
  TypesNativeGraphQL
};
