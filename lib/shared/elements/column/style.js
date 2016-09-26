import css from 'helpers/styles/css';

export default {
  type: 'column',
  options: [
    {
      label: 'Background',
      type: 'Section',
      id: 'backgroundSection',
      unlocks: [
        {
          label: 'Background Layers',
          type: 'Background',
          id: 'background'
        },
        {
          label: 'Rounded Corners',
          type: 'Optional',
          id: 'useCorners',
          unlocks: [
            {
              type: 'Corners',
              id: 'corners'
            }
          ]
        },
        {
          label: 'Border',
          type: 'Optional',
          id: 'useBorder',
          unlocks: [
            {
              type: 'Border',
              id: 'border'
            }
          ]
        },
        {
          label: 'Shadow',
          type: 'BoxShadow',
          id: 'shadow'
        }
      ]
    }
  ],
  defaults: {
    background: [],
    useCorners: false,
    corners: '0px',
    useBorder: false,
    shadow: []
  },
  rules: (props) => {
    const rule = css({})
      .setBackground(props.background)
      .setProperty('borderRadius', props.useCorners && props.corners)
      .setBorder(props.useBorder && props.border)
      .setBoxShadows(props.shadow);

    return {
      root: rule.rules
    };
  }
};
