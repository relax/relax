export default [
  {
    label: 'Music',
    type: 'Select',
    id: 'type',
    props: {
      labels: ['Your Sounds', 'Soundcloud'],
      values: ['local', 'soundcloud']
    },
    unlocks: {
      local: [
        {
          label: 'Sound',
          type: 'Audio',
          id: 'sound'
        }
      ],
      soundcloud: [
        {
          label: 'Soundcloud music url',
          type: 'String',
          id: 'soundcloud'
        }
      ]
    }
  },
  {
    label: 'Default volume',
    type: 'Percentage',
    id: 'defaultVolume'
  },
  {
    label: 'Background Image',
    type: 'Optional',
    id: 'useBackgroundImage',
    unlocks: [
      {
        type: 'Image',
        id: 'backgroundImage',
        unlocks: [
          {
            label: 'Repeat',
            type: 'Select',
            id: 'repeat',
            props: {
              labels: ['No repeat', 'Repeat', 'Repeat horiz.', 'Repeat vert.'],
              values: ['no-repeat', 'repeat', 'repeat-x', 'repeat-y']
            }
          },
          {
            label: 'Opacity',
            type: 'Percentage',
            id: 'opacity'
          },
          {
            label: 'Vertical position',
            type: 'Percentage',
            id: 'vertical'
          },
          {
            label: 'Horizontal position',
            type: 'Percentage',
            id: 'horizontal'
          }
        ]
      }
    ]
  }
];
