export default [
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
  }
];
