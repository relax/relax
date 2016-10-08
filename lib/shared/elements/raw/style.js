import css from 'helpers/styles/css';
import forEach from 'lodash.foreach';
import layoutOptions from 'helpers/styles/layout-options';

export default {
  type: 'raw',
  options: [
    layoutOptions,
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
    },
    {
      label: 'Custom',
      type: 'Section',
      id: 'customSection',
      unlocks: [
        {
          label: 'Custom Properties',
          type: 'Custom',
          id: 'custom'
        }
      ]
    }
  ],
  defaults: {
    useCorners: false,
    corners: '0px',
    useBorder: false,
    shadow: []
  },
  rules: (props) => {
    const cssRule = css({})
      .setMarginPadding(props.marginPadding)
      .setDisplay(props.display)
      .setPosition(props.position)
      .setProperty('borderRadius', props.useCorners && props.corners)
      .setBorder(props.useBorder && props.border)
      .setBoxShadows(props.shadow)
      .setBackground(props.background);

    if (props.custom) {
      forEach(props.custom, (cust) => {
        cssRule.setProperty(cust.property, cust.value);
      });
    }

    return {
      root: cssRule.rules
    };
  }
};
