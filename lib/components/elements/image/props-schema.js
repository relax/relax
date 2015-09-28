import {Types} from '../../../data-types';

export default [
  {
    label: 'Background color',
    type: Types.Color,
    id: 'color'
  },
  {
    label: 'Image',
    type: Types.Image,
    id: 'children'
  },
  {
    label: 'On mouse over',
    type: 'Optional',
    id: 'useOver',
    unlocks: [
      {
        type: Types.Image,
        id: 'imageOver'
      }
    ]
  },
  {
    label: 'Height',
    type: Types.Select,
    id: 'height',
    props: {
      labels: ['Auto', 'Strict'],
      values: ['auto', 'strict']
    },
    unlocks: {
      strict: [
        {
          label: 'Pixels',
          type: Types.Pixels,
          id: 'height_px'
        },
        {
          label: 'Vertical position',
          type: Types.Percentage,
          id: 'vertical'
        }
      ]
    }
  },
  {
    label: 'Width',
    type: Types.Select,
    id: 'width',
    props: {
      labels: ['Full width', 'Max. width'],
      values: ['full', 'max']
    },
    unlocks: {
      max: [
        {
          label: 'Pixels',
          type: Types.Pixels,
          id: 'width_px'
        },
        {
          label: 'Horizontal alignment',
          type: Types.Select,
          id: 'horizontal',
          props: {
            labels: ['Left', 'Center', 'Right'],
            values: ['left', 'center', 'right']
          }
        }
      ]
    }
  }
];
