
export default [
  {
    label: 'Padding',
    type: 'Padding',
    id: 'padding'
  },
  {
    label: 'Content vertical align',
    type: 'Select',
    id: 'vertical',
    props: {
      labels: ['Top', 'Center', 'Bottom'],
      values: ['top', 'middle', 'bottom']
    }
  }
];
