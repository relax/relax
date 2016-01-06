import React from 'react';

import {Types} from '../../../data-types';

export default [
  {
    label: 'Height',
    type: Types.Pixels,
    id: 'height'
  },
  {
    type: 'Columns',
    options: [
      {
        label: 'Latitude',
        type: Types.Number,
        id: 'lat',
        props: {
          arrows: false,
          min: false
        }
      },
      {
        label: 'Longitude',
        type: Types.Number,
        id: 'lng',
        props: {
          arrows: false,
          min: false
        }
      }
    ]
  },
  {
    type: 'Columns',
    options: [
      {
        label: 'Zoom',
        type: Types.Number,
        id: 'zoom',
        props: {
          min: 0,
          max: 21,
          label: <i className='fa fa-search'></i>
        }
      },
      {
        label: 'Use scrollwheel',
        type: Types.Boolean,
        id: 'scrollwheel'
      }
    ]
  },
  {
    type: 'Columns',
    options: [
      {
        label: 'Use marker',
        type: Types.Boolean,
        id: 'useMarker'
      },
      {
        label: 'Zoom controls',
        type: Types.Boolean,
        id: 'zoomControls'
      }
    ]
  },
  {
    type: 'Columns',
    options: [
      {
        label: 'Map Type Controls',
        type: Types.Boolean,
        id: 'mapTypeControl'
      },
      {
        label: 'Streetview Control',
        type: Types.Boolean,
        id: 'streetViewControl'
      }
    ]
  }
];
