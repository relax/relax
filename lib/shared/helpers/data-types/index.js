export const TypesProps = {
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

export const schemaTypesOrdered = [
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

export const dependsOnWhitelist = [
  'String',
  'Select',
  'Boolean',
  'Number'
];

export const singleFixedProperties = [
  {
    id: 'title',
    title: 'Title',
    type: 'String',
    required: true,
    locked: true
  },
  {
    id: 'slug',
    title: 'Slug',
    type: 'String',
    required: true,
    locked: true
  },
  {
    id: 'state',
    title: 'State',
    type: 'String',
    required: true,
    locked: true
  },
  {
    id: 'date',
    title: 'Created Date',
    type: 'Date',
    required: true,
    locked: true
  },
  {
    id: 'updatedDate',
    title: 'Updated Date',
    type: 'Date',
    required: true,
    locked: true
  },
  {
    id: 'publishedDate',
    title: 'Published date',
    type: 'Date',
    required: true,
    locked: true
  },
  {
    id: 'data',
    title: 'Page builder data',
    type: 'Array',
    required: true,
    locked: true
  }
];

export const propertyOptions = [
  {
    type: 'Columns',
    options: [
      {
        id: 'title',
        label: 'Option Title',
        type: 'String'
      },
      {
        id: 'required',
        label: 'Option Required',
        type: 'Boolean'
      }
    ]
  },
  {
    type: 'Select',
    id: 'type',
    label: 'Option Type',
    props: {
      labels: schemaTypesOrdered,
      values: schemaTypesOrdered
    }
  }
];

export default {
  TypesProps,
  schemaTypesOrdered,
  dependsOnWhitelist,
  singleFixedProperties,
  propertyOptions
};
