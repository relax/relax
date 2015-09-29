export default [
  {
    tag: 'Button',
    label: 'Toogle play',
    props: {
      layout: 'icon'
    },
    children: [
      {
        tag: 'Icon',
        props: {
          icon: 'fa fa-play'
        },
        subComponent: true
      }
    ],
    subComponent: true
  },
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
      alignment: 'center',
      usePadding: true,
      padding: '0px 10px 0px 0px'
    },
    children: '00:00',
    subComponent: true
  },
  {
    tag: 'TextBox',
    label: 'Duration',
    props: {
      useAlign: true,
      alignment: 'center',
      usePadding: true,
      padding: '0px 0px 0px 10px'
    },
    children: '00:00',
    subComponent: true
  },
  {
    tag: 'Button',
    label: 'Toogle mute',
    props: {
      layout: 'icon'
    },
    children: [
      {
        tag: 'Icon',
        props: {
          icon: 'fa fa-volume-up'
        },
        subComponent: true
      }
    ],
    subComponent: true
  }
];
