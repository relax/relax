export default [
  {
    type: 'Columns',
    options: [
      {
        label: 'Begin',
        type: 'Number',
        id: 'begin'
      },
      {
        label: 'End',
        type: 'Number',
        id: 'end'
      }
    ]
  },
  {
    type: 'Columns',
    options: [
      {
        label: 'Duration',
        type: 'Number',
        id: 'duration'
      },
      {
        label: 'Alignment',
        type: 'Select',
        id: 'align',
        props: {
          labels: ['Left', 'Center', 'Right'],
          values: ['left', 'center', 'right']
        }
      }
    ]
  }
];
