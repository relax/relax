import {Types} from '../../../data-types';

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
  },
  {
    label: 'Trim',
    type: 'Optional',
    id: 'useTrim',
    unlocks: [
      {
        type: Types.Pixels,
        id: 'maxWidth'
      }
    ]
  }
];
