export default [
  {
    label: 'Padding',
    type: 'Optional',
    id: 'usePadding',
    unlocks: [
      {
        type: 'Padding',
        id: 'padding'
      }
    ]
  },
  {
    label: 'Alignment',
    type: 'Optional',
    id: 'useAlign',
    unlocks: [
      {
        type: 'Select',
        id: 'textAlign',
        props: {
          labels: ['Left', 'Center', 'Right'],
          values: ['left', 'center', 'right']
        }
      }
    ]
  },
  {
    label: 'Trim',
    type: 'Optional',
    id: 'useTrim',
    unlocks: [
      {
        type: 'Pixels',
        id: 'maxWidth'
      }
    ]
  }
];
