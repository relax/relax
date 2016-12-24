export const typesProps = {
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
        type: 'Columns',
        options: [
          {
            id: 'min',
            label: 'Minimum',
            type: 'Number',
            props: {
              min: false
            }
          },
          {
            id: 'max',
            label: 'Maximum',
            type: 'Number',
            props: {
              min: false
            }
          }
        ]
      }
    ],
    defaults: {
      min: -9999,
      max: 9999
    }
  }
};

export const schemaTypesOrderedLabels = [
  'String',
  'Rich Text',
  'Page Builder Fragment',
  'Link',
  'Image',
  // 'Video',
  // 'Audio',
  'Date',
  // 'Reference',
  // 'Multiple Reference',
  'User',
  'Select',
  'Boolean',
  'Number',
  'Icon',
  'Color'
];

// Needs to map to an input option type
export const schemaTypesOrderedValues = [
  'String',
  'Html',
  'BuilderFragment',
  'Link',
  'Image',
  // 'Video',
  // 'Audio',
  'Date',
  // 'Reference',
  // 'MultipleReference',
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
    title: 'Published Date',
    type: 'Date',
    required: true,
    locked: true
  },
  {
    id: 'data',
    title: 'Page Fragment',
    type: 'BuilderFragment',
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
      labels: schemaTypesOrderedLabels,
      values: schemaTypesOrderedValues
    }
  }
];

export default {
  typesProps,
  schemaTypesOrderedLabels,
  schemaTypesOrderedValues,
  dependsOnWhitelist,
  singleFixedProperties,
  propertyOptions
};
