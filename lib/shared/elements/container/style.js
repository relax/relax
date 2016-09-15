import css from 'helpers/styles/css';
import layoutOptions from 'helpers/styles/layout-options';
import {getColorString} from 'helpers/styles/colors';

export default {
  type: 'container',
  options: [
    layoutOptions,
    {
      label: 'Size',
      type: 'Section',
      id: 'sizeSection',
      unlocks: [
        {
          label: 'Max Width',
          type: 'Optional',
          id: 'useMaxWidth',
          unlocks: [
            {
              label: 'Maximum Width',
              type: 'Number',
              id: 'maxWidth',
              props: {
                min: 0,
                max: false,
                allowed: ['px', '%']
              }
            },
            {
              label: 'Content horizontal alignment',
              type: 'Select',
              id: 'contentHorizontal',
              props: {
                labels: ['Left', 'Center', 'Right'],
                values: ['left', 'center', 'right']
              }
            }
          ]
        }
      ]
    },
    {
      label: 'Background',
      type: 'Section',
      id: 'backgroundSection',
      unlocks: [
        {
          label: 'Background Color',
          type: 'Optional',
          id: 'useBackgroundColor',
          unlocks: [
            {
              type: 'Color',
              id: 'backgroundColor',
              props: {
                gradients: true
              }
            }
          ]
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
    marginPadding: {
      'padding-top': '20px',
      'padding-right': '20px',
      'padding-bottom': '20px',
      'padding-left': '20px'
    },
    useBackgroundColor: false,
    backgroundColor: {
      value: '#ffffff',
      opacity: 100
    },
    useMaxWidth: true,
    maxWidth: '1000px',
    contentHorizontal: 'center',
    useCorners: false,
    corners: '0px',
    useBorder: false,
    shadow: []
  },
  rules: (props) => {
    const rule = {};
    const holderRule = {};

    css(rule)
      .setBackgroundColor(props.useBackgroundColor && props.backgroundColor)
      .setProperty('borderRadius', props.useCorners && props.corners)
      .setBorder(props.useBorder && props.border)
      .setBoxShadows(props.shadow)
      .when(props.useMaxWidth)
        .setProperty('maxWidth', props.maxWidth)
        .setProperty('width', '100%')
        .setProperty('display', 'inline-block');

    css(holderRule)
      .setMarginPadding(props.marginPadding)
      .setDisplay(props.display)
      .setPosition(props.position)
      .when(props.useMaxWidth)
      .setProperty('textAlign', props.contentHorizontal);

    return {
      container: rule,
      holder: holderRule
    };
  },
  getIdentifierLabel: (props) => {
    let str = '';

    if (props.useMaxWidth) {
      str += props.maxWidth;
    } else {
      str += 'Full';
    }

    str += ' | ';

    if (props.useBackgroundColor) {
      str += getColorString(props.backgroundColor);
    } else {
      str += 'transparent';
    }

    return str;
  }
};
