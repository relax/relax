var Types = {
  String: 'String',
  Number: 'Number',
  Boolean: 'Boolean',
  Relation: 'Relation',
  Color: 'Color',
  Font: 'Font',
  Html: 'Html',
  Image: 'Image',
  Audio: 'Image',
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
  Sorts: 'Sorts'
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
  TypesProps,
  schemaTypesOrdered,
  dependsOnWhitelist
};
