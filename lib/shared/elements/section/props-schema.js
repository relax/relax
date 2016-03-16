export default [
  {
    label: 'Navigation ID',
    type: 'String',
    id: 'navigation'
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
