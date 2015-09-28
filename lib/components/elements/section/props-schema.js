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
            label: 'Repeat',
            type: Types.Select,
            id: 'repeat',
            props: {
              labels: ['No repeat', 'Repeat', 'Repeat horiz.', 'Repeat vert.'],
              values: ['no-repeat', 'repeat', 'repeat-x', 'repeat-y']
            }
          },
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
