import css from 'helpers/styles/css';
import layoutOptions from 'helpers/styles/layout-options';
import {getColorString} from 'helpers/styles/colors';

export default {
  type: 'input',
  options: [
    layoutOptions,
    {
      label: 'Background',
      type: 'Section',
      id: 'backgroundSection',
      unlocks: [
        {
          label: 'Background Color',
          type: 'Optional',
          id: 'useBackground',
          unlocks: [
            {
              type: 'Color',
              id: 'backgroundColor'
            }
          ]
        },
        {
          label: 'Border',
          type: 'Optional',
          id: 'useBorder',
          unlocks: [
            {
              label: 'Border',
              type: 'Border',
              id: 'border'
            },
            {
              label: 'Border color on focused',
              type: 'Color',
              id: 'borderColorFocused'
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
        }
      ]
    },
    {
      label: 'Size',
      type: 'Section',
      id: 'sizeSection',
      unlocks: [
        {
          label: 'Width',
          type: 'Select',
          id: 'width',
          props: {
            labels: ['Full width', 'Max Width'],
            values: ['full', 'max']
          },
          unlocks: {
            max: [
              {
                label: 'Max Width',
                id: 'maxWidth',
                type: 'Pixels'
              },
              {
                label: 'Align',
                id: 'align',
                type: 'Select',
                props: {
                  labels: ['Left', 'Center', 'Right'],
                  values: ['left', 'center', 'right']
                }
              }
            ]
          }
        }
      ]
    },
    {
      label: 'Text',
      type: 'Section',
      id: 'textSection',
      unlocks: [
        {
          label: 'Font Family',
          id: 'font',
          type: 'Font'
        },
        {
          type: 'Columns',
          options: [
            {
              label: 'Font Size',
              id: 'fontSize',
              type: 'Number',
              props: {
                allowed: ['px', 'em', 'pt']
              }
            },
            {
              label: 'Line Height',
              id: 'lineHeight',
              type: 'Pixels'
            }
          ]
        },
        {
          type: 'Columns',
          options: [
            {
              label: 'Letter Spacing',
              id: 'letterSpacing',
              type: 'Number',
              props: {
                allowed: ['px', 'em', 'pt']
              }
            },
            {
              label: 'Color',
              id: 'color',
              type: 'Color'
            }
          ]
        },
        {
          type: 'Columns',
          options: [
            {
              label: 'Placeholder Color',
              id: 'placeholderColor',
              type: 'Color'
            },
            {
              label: 'Text align',
              id: 'textAlign',
              type: 'Select',
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
    useBackground: false,
    backgroundColor: {
      value: '#ffffff',
      opacity: 100
    },
    marginPadding: {
      'padding-top': '10px',
      'padding-right': '10px',
      'padding-bottom': '10px',
      'padding-left': '10px'
    },
    useBorder: false,
    border: false,
    borderColorFocused: {
      value: '#333333',
      opacity: 100
    },
    useCorners: false,
    corners: '0px',
    width: 'max',
    maxWidth: '300px',
    align: 'left',
    font: {},
    fontSize: '16px',
    lineHeight: '16px',
    letterSpacing: '0px',
    color: {
      value: '#ffffff',
      opacity: 100
    },
    placeholderColor: {
      value: '#ffffff',
      opacity: 100
    },
    textAlign: 'left'
  },
  rules: (props) => {
    const rules = {
      input: {},
      holder: {}
    };

    // input
    css(rules.input)
      .setPadding(props.marginPadding)
      .setBackgroundColor(props.useBackground && props.backgroundColor)
      .setColor(props.color)
      .setProperty('borderRadius', props.useCorners && props.corners)
      .setProperty('fontSize', props.fontSize)
      .setProperty('lineHeight', props.lineHeight)
      .setProperty('letterSpacing', props.letterSpacing)
      .setProperty('textAlign', props.textAlign)
      .setBorder(props.useBorder && props.border)
      .setPlaceholderColor(props.placeholderColor)
      .setProperty('width', props.width === 'max' && props.maxWidth)
      .setFont(props.font);

    // input on focus
    rules.input[':focus'] = css({})
      .setProperty('borderColor', props.useBorder && getColorString(props.borderColorFocused))
      .rules;

    // holder
    css(rules.holder)
      .setMargin(props.marginPadding)
      .setDisplay(props.display)
      .setPosition(props.position)
      .setProperty('textAlign', props.align);

    return rules;
  }
};
