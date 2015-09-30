import {Types} from '../../../data-types';
import React from 'react';

export default [
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
    label: 'Latitude',
    type: Types.String,
    id: 'lat'
  },
  {
    label: 'Longitude',
    type: Types.String,
    id: 'lng'
  },
  {
    label: 'Height',
    type: Types.Pixels,
    id: 'height'
  },
  {
    label: 'Use scrollwheel',
    type: Types.Boolean,
    id: 'scrollwheel'
  },
  {
    label: 'Zoom controls',
    type: Types.Boolean,
    id: 'zoomControls'
  },
  {
    label: 'Map Type Controls',
    type: Types.Boolean,
    id: 'mapTypeControl'
  },
  {
    label: 'Streetview Control',
    type: Types.Boolean,
    id: 'streetViewControl'
  },
  {
    label: 'Use marker',
    type: Types.Boolean,
    id: 'useMarker'
  }
];
