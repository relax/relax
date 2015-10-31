import {Types} from '../../../data-types';

export default [
  {
    id: 'add-button',
    label: false,
    type: Types.Button,
    props: {
      label: 'Add column',
      action: 'addElement',
      actionProps: 'Column'
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
    label: 'Desktop display',
    type: Types.ManageColumns,
    id: 'desktop',
    props: {
      multiRows: false
    }
  },
  {
    label: 'Tablet display',
    type: Types.ManageColumns,
    id: 'tablet'
  },
  {
    label: 'Mobile display',
    type: Types.ManageColumns,
    id: 'mobile'
  }
];
