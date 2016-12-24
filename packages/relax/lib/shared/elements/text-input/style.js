import css from 'helpers/styles/css';
import layoutOptions from 'helpers/styles/layout-options';
import {getColorString} from 'helpers/styles/colors';
import {getBorderValue} from 'helpers/styles/helpers';

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
          label: 'Use Border',
          type: 'Optional',
          id: 'useBorder',
          unlocks: [
            {
              label: 'Border',
              type: 'Border',
              id: 'border'
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
    },
    {
      label: 'When Overed',
      type: 'Section',
      id: 'overedSection',
      unlocks: [
        {
          label: 'Overlap Color',
          type: 'Optional',
          id: 'useColorOvered',
          unlocks: [
            {
              id: 'colorOvered',
              type: 'Color'
            }
          ]
        },
        {
          label: 'Overlap Border Color',
          type: 'Optional',
          id: 'useBorderColorOvered',
          unlocks: [
            {
              type: 'Color',
              id: 'borderColorOvered'
            }
          ]
        },
        {
          label: 'Overlap Background Color',
          type: 'Optional',
          id: 'useBackgroundColorOvered',
          unlocks: [
            {
              type: 'Color',
              id: 'backgroundColorOvered'
            }
          ]
        }
      ]
    },
    {
      label: 'When Focused',
      type: 'Section',
      id: 'focusedSection',
      unlocks: [
        {
          label: 'Overlap Color',
          type: 'Optional',
          id: 'useColorFocused',
          unlocks: [
            {
              id: 'colorFocused',
              type: 'Color'
            }
          ]
        },
        {
          label: 'Overlap Border Color',
          type: 'Optional',
          id: 'useBorderColorFocused',
          unlocks: [
            {
              type: 'Color',
              id: 'borderColorFocused'
            }
          ]
        },
        {
          label: 'Overlap Background Color',
          type: 'Optional',
          id: 'useBackgroundColorFocused',
          unlocks: [
            {
              type: 'Color',
              id: 'backgroundColorFocused'
            }
          ]
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
    useBorder: true,
    border: getBorderValue({
      size: 1,
      color: '#cccccc'
    }),
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
      value: '#333333',
      opacity: 100
    },
    placeholderColor: {
      value: '#cccccc',
      opacity: 100
    },
    textAlign: 'left',
    useColorOvered: false,
    colorOvered: {
      value: '#333333',
      opacity: 100
    },
    useBorderColorOvered: false,
    borderColorOvered: {
      value: '#333333',
      opacity: 100
    },
    useBackgroundColorOvered: false,
    backgroundColorOvered: {
      value: '#ffffff',
      opacity: 100
    },
    useColorFocused: false,
    colorFocused: {
      value: '#333333',
      opacity: 100
    },
    useBorderColorFocused: false,
    borderColorFocused: {
      value: '#333333',
      opacity: 100
    },
    useBackgroundColorFocused: false,
    backgroundColorFocused: {
      value: '#ffffff',
      opacity: 100
    }
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

    // input on hover
    rules.input[':hover'] = css({})
      .setProperty('borderColor', props.useBorderColorOvered && getColorString(props.borderColorOvered))
      .setColor(props.useColorOvered && props.colorOvered)
      .setBackgroundColor(props.useBackgroundColorOvered && props.backgroundColorOvered)
      .rules;

    // input on focus
    rules.input[':focus'] = css({})
      .setProperty('borderColor', props.useBorderColorFocused && getColorString(props.borderColorFocused))
      .setColor(props.useColorFocused && props.colorFocused)
      .setBackgroundColor(props.useBackgroundColorFocused && props.backgroundColorFocused)
      .rules;

    // holder
    css(rules.holder)
      .setMargin(props.marginPadding)
      .setDisplay(props.display)
      .setPosition(props.position)
      .setProperty('textAlign', props.align)
      .setCustoms(props.custom);

    return rules;
  }
};
