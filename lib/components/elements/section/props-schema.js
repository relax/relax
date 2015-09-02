import {Types} from '../../../data-types';

export default [
  {
    label: 'Navigation ID',
    type: Types.String,
    id: 'navigation'
  },
  {
    label: 'Background Image',
    type: 'Optional',
    id: 'useBackgroundImage',
    unlocks: [
      {
        type: Types.Image,
        id: 'backgroundImage',
        unlocks: [
          {
            label: 'Vertical position',
            type: Types.Percentage,
            id: 'vertical'
          },
          {
            label: 'Horizontal position',
            type: Types.Percentage,
            id: 'horizontal'
          }
        ]
      }
    ]
  }
];
