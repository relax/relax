import React from 'react';

export default [
  {
    label: 'Height',
    type: 'Pixels',
    id: 'height'
  },
  {
    type: 'Columns',
    options: [
      {
        label: 'Latitude',
        type: 'Number',
        id: 'lat',
        props: {
          arrows: false,
          min: false
        }
      },
      {
        label: 'Longitude',
        type: 'Number',
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
        type: 'Number',
        id: 'zoom',
        props: {
          min: 0,
          max: 21,
          label: <i className='fa fa-search'></i>
        }
      },
      {
        label: 'Use scrollwheel',
        type: 'Boolean',
        id: 'scrollwheel'
      }
    ]
  },
  {
    type: 'Columns',
    options: [
      {
        label: 'Use marker',
        type: 'Boolean',
        id: 'useMarker'
      },
      {
        label: 'Zoom controls',
        type: 'Boolean',
        id: 'zoomControls'
      }
    ]
  },
  {
    type: 'Columns',
    options: [
      {
        label: 'Map Type Controls',
        type: 'Boolean',
        id: 'mapTypeControl'
      },
      {
        label: 'Streetview Control',
        type: 'Boolean',
        id: 'streetViewControl'
      }
    ]
  }
];
