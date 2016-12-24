export default {
  icon: {
    class: 'nc-icon-mini ui-1_email-84'
  },
  dynamicLinkable: true,
  dynamicLinkableOptions: {
    goal: 'write',
    extraLinks: [
      {
        label: 'States',
        id: 'state',
        properties: [
          {
            label: 'Loading',
            id: 'loading',
            type: 'State'
          },
          {
            label: 'Success',
            id: 'success',
            type: 'State'
          },
          {
            label: 'Error',
            id: 'error',
            type: 'State'
          }
        ]
      }
    ]
  },
  category: 'form',
  drop: {},
  drag: {}
};
