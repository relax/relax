export default [
  {
    label: 'Layout',
    type: 'Select',
    id: 'layout',
    props: {
      labels: ['Text', 'Icon - Text', 'Text - Icon', 'Icon'],
      values: ['text', 'icontext', 'texticon', 'icon']
    },
    unlocks: {
      icontext: [
        {
          label: 'Arrange',
          type: 'Select',
          id: 'arrange',
          props: {
            labels: ['Side by side', 'Blocks'],
            values: ['side', 'blocks']
          }
        }
      ],
      texticon: [
        {
          label: 'Arrange',
          type: 'Select',
          id: 'arrange',
          props: {
            labels: ['Side by side', 'Blocks'],
            values: ['side', 'blocks']
          }
        }
      ]
    }
  }
];
