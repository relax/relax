import css from 'helpers/styles/css';
import layoutOptions from 'helpers/styles/layout-options';
import {getColorString} from 'helpers/styles/colors';

export default {
  type: 'lineDivider',
  options: [
    layoutOptions,
    {
      label: 'Line',
      type: 'Section',
      id: 'lineSection',
      unlocks: [
        {
          type: 'Columns',
          options: [
            {
              label: 'Line Height',
              type: 'Pixels',
              id: 'size'
            },
            {
              label: 'Style',
              type: 'LineStyle',
              id: 'style'
            }
          ]
        },
        {
          label: 'Color',
          type: 'Color',
          id: 'color'
        },
        {
          label: 'Max Width',
          type: 'Optional',
          id: 'useMaxWidth',
          unlocks: [
            {
              label: 'Max Width',
              type: 'Pixels',
              id: 'maxWidth'
            },
            {
              label: 'Align',
              type: 'Select',
              id: 'align',
              props: {
                labels: ['Left', 'Center', 'Right'],
                values: ['left', 'center', 'right']
              }
            }
          ]
        }
      ]
    }
  ],
  defaults: {
    marginPadding: {
      'padding-top': '5px',
      'padding-right': '0px',
      'padding-bottom': '10px',
      'padding-left': '0px'
    },
    size: '1px',
    style: 'solid',
    color: {
      value: '#000000',
      opacity: 100
    },
    useMaxWidth: false,
    maxWidth: '100px',
    align: 'center'
  },
  rules: (props) => {
    const rules = {
      line: {},
      holder: {}
    };

    css(rules.holder)
      .setDisplay(props.display)
      .setPosition(props.position)
      .setMarginPadding(props.marginPadding)
      .setProperty('height', props.size)
      .setProperty('textAlign', props.useMaxWidth && props.align);

    css(rules.line)
      .setProperty('borderBottom', `${props.size} ${props.style} ${getColorString(props.color)}`)
      .when(props.useMaxWidth)
        .setProperty('display', 'inline-block')
        .setProperty('width', props.maxWidth)
        .setProperty('maxWidth', '100%')
        .setProperty('verticalAlign', 'top');

    return rules;
  },
  getIdentifierLabel: (props) => `${props.size}px | ${props.width}`
};
