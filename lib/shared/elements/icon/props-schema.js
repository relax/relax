export default [
  {
    label: 'Icon',
    type: 'Icon',
    id: 'icon'
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
];
