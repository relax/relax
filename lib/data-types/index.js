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
  Icon: 'Icon'
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
  Icon: String,
  Image: Schema.Types.ObjectId,
  Select: String,
  Pixels: Number,
  Percentage: Number,
  Padding: String,
  Margin: String,
  Corners: String,
  Style: Schema.Types.ObjectId
};

var TypesProps = {
  String: {
    default: ''
  },
  Boolean: {
    default: false
  },
  Number: {
    default: 0,
    options: [
      {
        id: 'min',
        label: 'Minimum',
        type: Types.Number,
        props: {
          label: '#',
          min: false
        }
      },
      {
        id: 'max',
        label: 'Maximum',
        type: Types.Number,
        props: {
          label: '#',
          min: false
        }
      },
      {
        id: 'label',
        label: 'Label',
        type: Types.String
      }
    ],
    defaults: {
      min: -9999,
      max: 9999,
      label: '#'
    }
  }
};

var schemaTypes = [
  {
    label: 'Content',
    types: [
      'String',
      'Date',
      'Html',
      'Markdown',
      'Image',
      'Icon',
      'Relation'
    ]
  },
  {
    label: 'Values',
    types: [
      'Select',
      'Boolean',
      'Number'
    ]
  },
  {
    label: 'Customization',
    types: [
      'Pixels',
      'Percentage',
      'Color',
      'Padding',
      'Margin',
      'Corners',
      'Border',
      'Style',
      'Font'
    ]
  }
];

export default {
  Types,
  TypesNative,
  TypesProps,
  schemaTypes
};
