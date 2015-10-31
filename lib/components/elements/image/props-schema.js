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
    label: 'Strict height',
    type: 'Optional',
    id: 'strictHeight',
    unlocks: [
      {
        label: 'Pixels',
        type: Types.Pixels,
        id: 'height'
      },
      {
        label: 'Vertical position',
        type: Types.Percentage,
        id: 'vertical'
      }
    ]
  },
  {
    label: 'Max Width',
    type: 'Optional',
    id: 'useMaxWidth',
    unlocks: [
      {
        label: 'Pixels',
        type: Types.Pixels,
        id: 'width'
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
];
