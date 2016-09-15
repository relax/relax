import css from 'helpers/styles/css';
import layoutOptions from 'helpers/styles/layout-options';
import {getColorString} from 'helpers/styles/colors';

export default {
  type: 'icon',
  options: [
    layoutOptions,
    {
      label: 'Icon',
      type: 'Section',
      id: 'iconSection',
      unlocks: [
        {
          type: 'Columns',
          options: [
            {
              label: 'Color',
              type: 'Color',
              id: 'color'
            },
            {
              label: 'Font size',
              id: 'size',
              type: 'Number',
              props: {
                allowed: ['px', 'em', 'pt']
              }
            }
          ]
        },
        {
          label: 'Alignment',
          type: 'Select',
          id: 'align',
          props: {
            labels: ['Left', 'Center', 'Right'],
            values: ['left', 'center', 'right']
          }
        }
      ]
    },
    {
      label: 'Background',
      type: 'Section',
      id: 'backgroundSection',
      unlocks: [
        {
          label: 'Use Background',
          type: 'Optional',
          id: 'background',
          unlocks: [
            {
              label: 'Width',
              type: 'Pixels',
              id: 'width'
            },
            {
              label: 'Height',
              type: 'Pixels',
              id: 'height'
            },
            {
              label: 'Background Color',
              type: 'Color',
              id: 'backgroundColor'
            },
            {
              label: 'Rounded Corners',
              type: 'Corners',
              id: 'corners'
            }
          ]
        }
      ]
    }
  ],
  defaults: {
    color: {
      value: '#ffffff',
      opacity: 100
    },
    size: '16px',
    align: 'center',
    background: false,
    width: '70px',
    height: '70px',
    backgroundColor: {
      value: '#000000',
      opacity: 100
    },
    corners: '0px'
  },
  rules: (props) => {
    const rules = {
      root: {},
      holder: {},
      icon: {}
    };

    css(rules.root)
      .setMarginPadding(props.marginPadding)
      .setDisplay(props.display)
      .setPosition(props.position)
      .setProperty('textAlign', props.align);

    css(rules.holder)
      .when(props.background)
      .setProperty('width', props.width)
      .setProperty('height', props.height)
      .setProperty('borderRadius', props.corners)
      .setBackgroundColor(props.backgroundColor);

    css(rules.icon)
      .setProperty('fontSize', props.size)
      .setColor(props.color)
      .when(props.background)
        .setProperty('lineHeight', props.height);

    return rules;
  },
  getIdentifierLabel: (props) => {
    let str = '';

    str += props.size;
    str += ' | ';
    str += getColorString(props.color);

    return str;
  }
};
