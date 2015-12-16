import {Types} from '../../../data-types';

export default [
  {
    label: 'Music',
    type: Types.Select,
    id: 'type',
    props: {
      labels: ['Your Sounds', 'Soundcloud'],
      values: ['local', 'soundcloud']
    },
    unlocks: {
      local: [
        {
          label: 'Sound',
          type: Types.Audio,
          id: 'sound'
        }
      ],
      soundcloud: [
        {
          label: 'Soundcloud music url',
          type: Types.String,
          id: 'soundcloud'
        }
      ]
    }
  },
  {
    label: 'Default volume',
    type: Types.Percentage,
    id: 'defaultVolume'
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
            label: 'Opacity',
            type: Types.Percentage,
            id: 'opacity'
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
