import React from 'react';

export default [
  {
    label: 'Schema assigned',
    id: 'schemaId',
    type: 'SchemaPicker'
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
      action: 'linkData'
    }
  },
  {
    label: 'Limit',
    id: 'limit',
    type: 'Number'
  },
  {
    label: 'Columns',
    id: 'columns',
    type: 'Number'
  },
  {
    label: 'Vertical gutter',
    id: 'verticalGutter',
    type: 'Pixels'
  },
  {
    label: 'Horizontal gutter',
    id: 'horizontalGutter',
    type: 'Pixels'
  },
  {
    label: 'Filter',
    id: 'filters',
    type: 'Filters'
  },
  {
    label: 'Sort',
    id: 'sorts',
    type: 'Sorts'
  }
];
