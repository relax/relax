var Types = {
  String: 'String',
  Number: 'Number',
  Boolean: 'Boolean',
  Relation: 'Relation',
  Color: 'Color',
  Font: 'Font',
  Html: 'Html',
  Image: 'Image',
  Audio: 'Audio',
  Select: 'Select',
  SelectEntry: 'SelectEntry',
  Pixels: 'Pixels',
  Percentage: 'Percentage',
  Padding: 'Padding',
  Margin: 'Margin',
  Corners: 'Corners',
  Border: 'Border',
  LineStyle: 'LineStyle',
  Style: 'Style',
  SchemaLink: 'SchemaLink',
  Button: 'Button',
  Icon: 'Icon',
  StateTrigger: 'StateTrigger',
  ManageColumns: 'ManageColumns',
  SchemaPicker: 'SchemaPicker',
  MenuPicker: 'MenuPicker',
  PagePicker: 'PagePicker',
  Filters: 'Filters',
  Sorts: 'Sorts',
  TextShadow: 'TextShadow',
  BoxShadow: 'BoxShadow',
  ShadowPosition: 'ShadowPosition'
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

var schemaTypesOrdered = [
  'String',
  'Html',
  'Link',
  'Image',
  'Video',
  'Audio',
  'Date',
  'Reference',
  'Multiple Reference',
  'User',
  'Select',
  'Boolean',
  'Number',
  'Icon',
  'Color'
];

var dependsOnWhitelist = [
  'String',
  'Select',
  'Boolean',
  'Number'
];

export default {
  Types,
  TypesProps,
  schemaTypesOrdered,
  dependsOnWhitelist
};
