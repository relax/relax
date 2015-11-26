export default [
  {
    tag: 'TextBox',
    label: 'Song artist',
    props: {
      useAlign: true,
      alignment: 'left'
    },
    children: 'Artist name',
    subComponent: true
  },
  {
    tag: 'TextBox',
    label: 'Song title',
    props: {
      useAlign: true,
      alignment: 'left'
    },
    children: 'Song title',
    subComponent: true
  },
  {
    tag: 'TextBox',
    label: 'Time',
    props: {
      useAlign: true,
      alignment: 'center'
    },
    children: '00:00',
    subComponent: true
  }
];
