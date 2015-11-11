import {Types} from '../../../data-types';

export default [
  {
    label: 'Padding',
    type: Types.Padding,
    id: 'padding'
  },
  {
    label: 'Content vertical align',
    type: Types.Select,
    id: 'vertical',
    props: {
      labels: ['Top', 'Center', 'Bottom'],
      values: ['top', 'middle', 'bottom']
    }
  }
];
