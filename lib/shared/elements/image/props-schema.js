export default [
  {
    label: 'Background color',
    type: 'Color',
    id: 'color'
  },
  {
    label: 'Image',
    type: 'Image',
    id: 'children'
  },
  {
    label: 'On mouse over',
    type: 'Optional',
    id: 'useOver',
    unlocks: [
      {
        type: 'Image',
        id: 'imageOver'
      }
    ]
  },
  {
    label: 'Strict height',
    type: 'Optional',
    id: 'strictHeight',
    unlocks: [
      {
        label: 'Pixels',
        type: 'Pixels',
        id: 'height'
      },
      {
        label: 'Vertical position',
        type: 'Percentage',
        id: 'vertical'
      }
    ]
  },
  {
    label: 'Max Width',
    type: 'Optional',
    id: 'useMaxWidth',
    unlocks: [
      {
        label: 'Pixels',
        type: 'Pixels',
        id: 'width'
      },
      {
        label: 'Horizontal alignment',
        type: 'Select',
        id: 'horizontal',
        props: {
          labels: ['Left', 'Center', 'Right'],
          values: ['left', 'center', 'right']
        }
      }
    ]
  }
];
