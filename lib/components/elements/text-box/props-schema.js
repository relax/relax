import {Types} from '../../../types';

export default [
  {
    label: 'Padding',
    type: 'Optional',
    id: 'usePadding',
    unlocks: [
      {
        type: Types.Padding,
        id: 'padding'
      }
    ]
  },
  {
    label: 'Alignment',
    type: 'Optional',
    id: 'useAlign',
    unlocks: [
      {
        type: Types.Select,
        id: 'textAlign',
        props: {
          labels: ['Left', 'Center', 'Right'],
          values: ['left', 'center', 'right']
        }
      }
    ]
  }
];
