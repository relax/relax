import css from 'helpers/styles/css';
import {getColorString} from 'helpers/styles/colors';
import layoutOptions from 'helpers/styles/layout-options';

export default {
  type: 'menu',
  options: [
    layoutOptions,
    {
      label: 'Alignment',
      type: 'Section',
      id: 'alignmentSection',
      unlocks: [
        {
          label: 'Distance between buttons',
          id: 'distance',
          type: 'Pixels'
        },
        {
          label: 'Buttons Alignment',
          id: 'alignment',
          type: 'Select',
          props: {
            labels: ['Left', 'Center', 'Right'],
            values: ['left', 'center', 'right']
          }
        }
      ]
    },
    {
      label: 'Buttons Text',
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
              label: 'Underline',
              id: 'underline',
              type: 'Boolean'
            }
          ]
        },
        {
          type: 'Columns',
          options: [
            {
              label: 'Color',
              id: 'color',
              type: 'Color'
            },
            {
              label: 'Color hover',
              id: 'colorOver',
              type: 'Color'
            }
          ]
        },
        {
          label: 'Shadow',
          id: 'shadow',
          type: 'TextShadow'
        }
      ]
    },
    {
      label: 'Buttons Background',
      type: 'Section',
      id: 'backgroundSection',
      unlocks: [
        {
          label: 'Use Background',
          type: 'Optional',
          id: 'useBackground',
          unlocks: [
            {
              label: 'Background Color',
              type: 'Color',
              id: 'backgroundColor'
            },
            {
              label: 'Background Color on over',
              type: 'Color',
              id: 'backgroundColorOver'
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
            },
            {
              label: 'Border Color on over',
              type: 'Color',
              id: 'borderColorOver'
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
          label: 'Padding',
          type: 'Optional',
          id: 'usePadding',
          unlocks: [
            {
              type: 'Padding',
              id: 'padding'
            }
          ]
        }
      ]
    },
    {
      label: 'Submenus Layout',
      type: 'Section',
      id: 'submenuLayoutSection',
      unlocks: [
        {
          label: 'Snap submenu (relative to main button)',
          id: 'submenuAlignment',
          type: 'Select',
          props: {
            labels: ['Left', 'Center', 'Right'],
            values: ['left', 'center', 'right']
          }
        },
        {
          type: 'Columns',
          options: [
            {
              label: 'Vertical Offset',
              id: 'submenuVertical',
              type: 'Pixels'
            },
            {
              label: 'Horizontal Offset',
              id: 'submenuHorizontal',
              type: 'Pixels'
            }
          ]
        },
        {
          label: 'Buttons Alignment',
          id: 'submenuButtonsAlignment',
          type: 'Select',
          props: {
            labels: ['Left', 'Center', 'Right'],
            values: ['left', 'center', 'right']
          }
        }
      ]
    },
    {
      label: 'Submenu Indicator',
      type: 'Section',
      id: 'submenuIndicatorSection',
      unlocks: [
        {
          label: 'Submenu Indicator Icon',
          id: 'submenuIndicatorIcon',
          type: 'Icon'
        },
        {
          type: 'Columns',
          options: [
            {
              label: 'Distance to text',
              id: 'submenuIndicatorDistance',
              type: 'Pixels'
            },
            {
              label: 'Icon font Size',
              id: 'submenuIndicatorSize',
              type: 'Pixels'
            }
          ]
        }
      ]
    },
    {
      label: 'Submenus Background',
      type: 'Section',
      id: 'submenuBackgroundSection',
      unlocks: [
        {
          label: 'Background Color',
          type: 'Color',
          id: 'submenuBackgroundColor'
        },
        {
          label: 'Padding',
          type: 'Padding',
          id: 'submenuPadding'
        },
        {
          label: 'Border',
          type: 'Optional',
          id: 'submenuUseBorder',
          unlocks: [
            {
              type: 'Border',
              id: 'submenuBorder'
            }
          ]
        },
        {
          label: 'Rounded Corners',
          type: 'Optional',
          id: 'submenuUseCorners',
          unlocks: [
            {
              type: 'Corners',
              id: 'submenuCorners'
            }
          ]
        }
      ]
    },
    {
      label: 'Submenus Buttons Text',
      type: 'Section',
      id: 'submenuButtonsTextSection',
      unlocks: [
        {
          label: 'Font Family',
          id: 'submenuButtonsFont',
          type: 'Font'
        },
        {
          type: 'Columns',
          options: [
            {
              label: 'Font Size',
              id: 'submenuButtonsFontSize',
              type: 'Number',
              props: {
                allowed: ['px', 'em', 'pt']
              }
            },
            {
              label: 'Line Height',
              id: 'submenuButtonsLineHeight',
              type: 'Pixels'
            }
          ]
        },
        {
          type: 'Columns',
          options: [
            {
              label: 'Letter Spacing',
              id: 'submenuButtonsLetterSpacing',
              type: 'Number',
              props: {
                allowed: ['px', 'em', 'pt']
              }
            },
            {
              label: 'Underline',
              id: 'submenuButtonsUnderline',
              type: 'Boolean'
            }
          ]
        },
        {
          type: 'Columns',
          options: [
            {
              label: 'Color',
              id: 'submenuButtonsColor',
              type: 'Color'
            },
            {
              label: 'Color hover',
              id: 'submenuButtonsColorOver',
              type: 'Color'
            }
          ]
        },
        {
          label: 'Shadow',
          id: 'submenuButtonsShadow',
          type: 'TextShadow'
        }
      ]
    },
    {
      label: 'Submenus Buttons Background',
      type: 'Section',
      id: 'submenuButtonsBackgroundSection',
      unlocks: [
        {
          label: 'Use Background',
          type: 'Optional',
          id: 'submenuButtonsUseBackground',
          unlocks: [
            {
              label: 'Background Color',
              type: 'Color',
              id: 'submenuButtonsBackgroundColor'
            },
            {
              label: 'Background Color on over',
              type: 'Color',
              id: 'submenuButtonsBackgroundColorOver'
            }
          ]
        },
        {
          label: 'Border',
          type: 'Optional',
          id: 'submenuButtonsUseBorder',
          unlocks: [
            {
              type: 'Border',
              id: 'submenuButtonsBorder'
            },
            {
              label: 'Border Color on over',
              type: 'Color',
              id: 'submenuButtonsBorderColorOver'
            }
          ]
        },
        {
          label: 'Rounded Corners',
          type: 'Optional',
          id: 'submenuButtonsUseCorners',
          unlocks: [
            {
              type: 'Corners',
              id: 'submenuButtonsCorners'
            }
          ]
        },
        {
          label: 'Padding',
          type: 'Optional',
          id: 'submenuButtonsUsePadding',
          unlocks: [
            {
              type: 'Padding',
              id: 'submenuButtonsPadding'
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
    distance: '20px',
    alignment: 'left',
    font: {},
    fontSize: '16px',
    lineHeight: '16px',
    letterSpacing: '0px',
    color: {
      value: '#333333',
      opacity: 100
    },
    colorOver: {
      value: '#1c86c8',
      opacity: 100
    },
    underline: false,
    useBackground: false,
    backgroundColor: {
      value: '#333333',
      opacity: 100
    },
    backgroundColorOver: {
      value: '#ffffff',
      opacity: 100
    },
    useBorder: false,
    border: false,
    borderColorOver: {
      value: '#ffffff',
      opacity: 100
    },
    useCorners: false,
    corners: '0px',
    usePadding: false,
    padding: '0px',
    submenuAlignment: 'left',
    submenuVertical: '10px',
    submenuHorizontal: '0px',
    submenuButtonsAlignment: 'left',
    submenuBackgroundColor: {
      value: '#333333',
      opacity: 100
    },
    submenuPadding: '15px',
    submenuUseBorder: false,
    submenuBorder: {},
    submenuUseCorners: false,
    submenuCorners: '0px',
    submenuButtonsFont: {},
    submenuButtonsFontSize: '16px',
    submenuButtonsLineHeight: '16px',
    submenuButtonsLetterSpacing: '0px',
    submenuButtonsColor: {
      value: '#ffffff',
      opacity: 100
    },
    submenuButtonsButtonsColorOver: {
      value: '#ffffff',
      opacity: 100
    },
    submenuButtonsUnderline: false,
    submenuButtonsUseBackground: false,
    submenuButtonsBackgroundColor: {
      value: '#ffffff',
      opacity: 100
    },
    submenuButtonsBackgroundColorOver: {
      value: '#ffffff',
      opacity: 100
    },
    submenuButtonsUseBorder: false,
    submenuButtonsBorder: false,
    submenuButtonsBorderColorOver: {
      value: '#ffffff',
      opacity: 100
    },
    submenuButtonsUseCorners: false,
    submenuButtonsCorners: '0px',
    submenuButtonsUsePadding: false,
    submenuButtonsPadding: '0px'
  },
  rules: (props) => {
    const menuRules = css({})
      .setDisplay(props.display)
      .setPosition(props.position)
      .setMarginPadding(props.marginPadding)
      .setProperty('textAlign', props.alignment)
      .setCustoms(props.custom)
      .rules;

    const entryRules = css({})
      .setProperty('marginRight', props.distance)
      .rules;

    const buttonRules = css({':hover': {}})
      .setProperty('fontSize', props.fontSize)
      .setProperty('lineHeight', props.lineHeight)
      .setProperty('letterSpacing', props.letterSpacing)
      .setProperty('textDecoration', props.underline && 'underline')
      .setColor(props.color)
      .setFont(props.font)
      .setTextShadows(props.shadow)
      .setBorder(props.useBorder && props.border)
      .setBackgroundColor(props.useBackground && props.backgroundColor)
      .setProperty('borderRadius', props.useCorners && props.corners)
      .setProperty('padding', props.usePadding && props.padding)
      .rules;
    css(buttonRules[':hover'])
      .setColor(props.colorOver)
      .setBackgroundColor(props.useBackground && props.backgroundColorOver)
      .setProperty('borderColor', getColorString(props.borderColorOver));

    const submenuRules = css({})
      .setBackgroundColor(props.submenuBackgroundColor)
      .setProperty('padding', props.submenuPadding)
      .setProperty('borderRadius', props.submenuUseCorners && props.submenuCorners)
      .setBorder(props.submenuUseBorder && props.submenuBorder)
      .setProperty('transform', `translateY(${props.submenuVertical})`)
      .when(props.submenuAlignment === 'left')
        .setProperty('left', props.submenuHorizontal)
      .when(props.submenuAlignment === 'right')
        .setProperty('left', 'auto')
        .setProperty('right', -props.submenuHorizontal)
      .when(props.submenuAlignment === 'center')
        .setProperty('left', '50%')
        .setProperty('transform', `translateX(-50%) translateY(${props.submenuVertical})`)
      .rules;

    const submenuButtonRules = css({':hover': {}})
      .setProperty('fontSize', props.submenuButtonsFontSize)
      .setProperty('lineHeight', props.submenuButtonsLineHeight)
      .setProperty('letterSpacing', props.submenuButtonsLetterSpacing)
      .setProperty('textDecoration', props.submenuButtonsUnderline && 'underline')
      .setColor(props.submenuButtonsColor)
      .setFont(props.submenuButtonsFont)
      .setTextShadows(props.submenuButtonsShadow)
      .setBorder(props.submenuButtonsUseBorder && props.submenuButtonsBorder)
      .setBackgroundColor(props.submenuButtonsUseBackground && props.submenuButtonsBackgroundColor)
      .setProperty('borderRadius', props.submenuButtonsUseCorners && props.submenuButtonsCorners)
      .setProperty('padding', props.submenuButtonsUsePadding && props.submenuButtonsPadding)
      .setProperty('textAlign', props.submenuButtonsAlignment)
      .rules;
    css(submenuButtonRules[':hover'])
      .setColor(props.submenuButtonsColorOver)
      .setBackgroundColor(props.submenuButtonsUseBackground && props.submenuButtonsBackgroundColorOver)
      .setProperty('borderColor', getColorString(props.submenuButtonsBorderColorOver));

    return {
      menu: menuRules,
      entry: entryRules,
      button: buttonRules,
      submenu: submenuRules,
      submenuButton: submenuButtonRules
    };
  }
};
