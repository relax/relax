import React from 'react';

export default [
  {
    label: 'Action',
    type: 'Select',
    id: 'action',
    props: {
      labels: ['Send e-mail', 'Schema entry', 'Custom endpoint'],
      values: ['email', 'schema', 'custom']
    },
    unlocks: {
      schema: [
        {
          label: 'Schema',
          type: 'SelectEntry',
          id: 'schema',
          props: {
            // store: schemasStore
          }
        }
      ],
      custom: [
        {
          label: 'Custom url',
          type: 'String',
          id: 'custom'
        }
      ]
    }
  },
  {
    label: false,
    id: 'linkDataButton',
    type: 'Button',
    props: {
      label: (
        <div>
          <i className='material-icons'>radio_button_checked</i>
          <span>Link data</span>
        </div>
      ),
      action: 'linkFormData'
    }
  }
];
