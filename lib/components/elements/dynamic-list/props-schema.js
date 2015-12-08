import React from 'react';

import {Types} from '../../../data-types';

export default [
  {
    label: 'Schema assigned',
    id: 'schemaId',
    type: Types.SchemaPicker
  },
  {
    label: false,
    id: 'linkDataButton',
    type: Types.Button,
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
    type: Types.Number
  },
  {
    label: 'Columns',
    id: 'columns',
    type: Types.Number
  },
  {
    label: 'Vertical gutter',
    id: 'verticalGutter',
    type: Types.Pixels
  },
  {
    label: 'Horizontal gutter',
    id: 'horizontalGutter',
    type: Types.Pixels
  },
  {
    label: 'Filter',
    id: 'filters',
    type: Types.Filters
  },
  {
    label: 'Sort',
    id: 'sorts',
    type: Types.Sorts
  }
];
