import {Types} from '../../../data-types';

export default [
  {
    label: 'Video Host',
    type: Types.Select,
    id: 'type',
    props: {
      labels: ['Youtube', 'Vimeo', 'Dailymotion'],
      values: ['youtube', 'vimeo', 'dailymotion']
    }
  },
  {
    label: 'Video Id/Url',
    type: Types.String,
    id: 'videoId'
  },
  {
    label: 'Video Height',
    type: Types.Percentage,
    id: 'videoHeight',
    props: {
      max: 200
    }
  }
];
