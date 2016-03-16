export default [
  {
    id: 'add-button',
    label: false,
    type: 'Button',
    props: {
      label: 'Add column',
      action: 'addElement',
      actionProps: {tag: 'Column'}
    }
  },
  {
    label: 'Space between columns',
    type: 'Pixels',
    id: 'spacing'
  },
  {
    label: 'Space between rows (not used on desktop)',
    type: 'Pixels',
    id: 'spacingRows'
  },
  {
    label: 'Columns display',
    type: 'ManageColumns',
    id: 'columnsDisplay'
  }
];
