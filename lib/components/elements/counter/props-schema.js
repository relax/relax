import {Types} from '../../../types';

export default [
  {
    label: 'Begin',
    type: Types.Number,
    id: 'begin'
  },
  {
    label: 'End',
    type: Types.Number,
    id: 'end'
  },
  {
    label: 'Duration',
    type: Types.Number,
    id: 'duration'
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
