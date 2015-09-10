import {Schema} from 'mongoose';

var Types = {
  String: 'String',
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
  Number: Number,
  Boolean: Boolean,
  Relation: Schema.Types.ObjectId,
  Color: String,
  Font: String,
  Html: String,
  Icon: String,
  Image: String,
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

var schemaTypesOrdered = {
  common: [
    'String',
    'Html',
    'Image',
    'Relation',
    'Select',
    'Boolean',
    'Number'
  ],
  more: [
    'Icon',
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
};

var dependsOnWhitelist = [
  'String',
  'Select',
  'Boolean',
  'Number'
];

export default {
  Types,
  TypesNative,
  TypesProps,
  schemaTypesOrdered,
  dependsOnWhitelist
};
