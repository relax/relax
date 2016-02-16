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
        type: 'Number',
        props: {
          label: '#',
          min: false
        }
      },
      {
        id: 'max',
        label: 'Maximum',
        type: 'Number',
        props: {
          label: '#',
          min: false
        }
      },
      {
        id: 'label',
        label: 'Label',
        type: 'String'
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
  TypesProps,
  schemaTypesOrdered,
  dependsOnWhitelist
};
