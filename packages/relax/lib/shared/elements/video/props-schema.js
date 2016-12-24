export default [
  {
    label: 'Video Host',
    type: 'Select',
    id: 'type',
    props: {
      labels: ['Youtube', 'Vimeo', 'Dailymotion'],
      values: ['youtube', 'vimeo', 'dailymotion']
    }
  },
  {
    label: 'Video Id/Url',
    type: 'String',
    id: 'videoId'
  }
];
