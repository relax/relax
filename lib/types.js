import {Schema} from 'mongoose';

var Types = {
  String: 'String',
  Date: 'Date',
  Number: 'Number',
  Boolean: 'Boolean',
  Relation: 'Relation',
  Color: 'Color',
  Font: 'Font',
  Html: 'Html',
  Image: 'Image',
  Select: 'Select',
  Pixels: 'Pixels',
  Percentage: 'Percentage',
  Padding: 'Padding',
  Margin: 'Margin',
  Corners: 'Corners',
  Border: 'Border',
  Style: 'Style',
  SchemaLink: 'SchemaLink',
  Button: 'Button',
  Icon: 'Icon',
  TextStyle: 'TextStyle'
};

var TypesNative = {
  String: String,
  Date: Date,
  Number: Number,
  Boolean: Boolean,
  Relation: Schema.Types.ObjectId,
  Color: String,
  Font: String,
  Html: String,
  Image: Schema.Types.ObjectId,
  Select: String,
  Pixels: Number,
  Percentage: Number,
  Padding: String,
  Margin: String,
  Corners: String,
  Style: Schema.Types.ObjectId,
  SchemaLink: Schema.Types.ObjectId
};

var TypesProps = {
  Select: [
    {
      id: 'labels',
      label: 'Labels',
      type: 'MultiString'
    }
  ]
};

export default {
  Types,
  TypesNative,
  TypesProps
};
