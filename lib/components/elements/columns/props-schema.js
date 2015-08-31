import {Types} from '../../../types';

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
    type: 'Columns',
    id: 'desktop',
    props: {
      multiRows: false
    }
  },
  {
    label: 'Tablet display',
    type: 'Columns',
    id: 'tablet'
  },
  {
    label: 'Mobile display',
    type: 'Columns',
    id: 'mobile'
  }
];
