import {Types} from '../../../data-types';

export default [
  {
    label: 'Icon',
    type: Types.Icon,
    id: 'icon'
  },
  {
    label: 'Alignment',
    type: Types.Select,
    id: 'align',
    props: {
      labels: ['Left', 'Center', 'Right'],
      values: ['left', 'center', 'right']
    }
  }
];
