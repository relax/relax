import {Types} from '../../../data-types';

export default [
  {
    id: 'add-button',
    label: false,
    type: Types.Button,
    props: {
      label: 'Add column',
      action: 'addElement',
      actionProps: {tag: 'Column'}
    }
  },
  {
    label: 'Space between columns',
    type: Types.Pixels,
    id: 'spacing'
  },
  {
    label: 'Space between rows (not used on desktop)',
    type: Types.Pixels,
    id: 'spacingRows'
  },
  {
    label: 'Columns display',
    type: Types.ManageColumns,
    id: 'columnsDisplay'
  }
];
