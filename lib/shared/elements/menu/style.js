import Utils from 'helpers/utils';
import {getColorString} from 'helpers/colors';

export default {
  type: 'menu',
  options: [
    {
      label: 'Layout',
      type: 'Section',
      id: 'layoutSection',
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
          label: 'Font Size',
          id: 'fontSize',
          type: 'Pixels'
        },
        {
          label: 'Line Height',
          id: 'lineHeight',
          type: 'Pixels'
        },
        {
          label: 'Letter Spacing',
          id: 'letterSpacing',
          type: 'Pixels'
        },
        {
          label: 'Color',
          id: 'color',
          type: 'Color'
        },
        {
          label: 'Links color hover',
          id: 'colorOver',
          type: 'Color'
        },
        {
          label: 'Underline',
          id: 'underline',
          type: 'Boolean'
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
          label: 'Vertical Offset',
          id: 'submenuVertical',
          type: 'Pixels'
        },
        {
          label: 'Horizontal Offset',
          id: 'submenuHorizontal',
          type: 'Pixels'
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
          type: 'Optional',
          id: 'submenuUsePadding',
          unlocks: [
            {
              type: 'Padding',
              id: 'submenuPadding'
            }
          ]
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
          label: 'Font Size',
          id: 'submenuButtonsFontSize',
          type: 'Pixels'
        },
        {
          label: 'Line Height',
          id: 'submenuButtonsLineHeight',
          type: 'Pixels'
        },
        {
          label: 'Letter Spacing',
          id: 'submenuButtonsLetterSpacing',
          type: 'Pixels'
        },
        {
          label: 'Color',
          id: 'submenuButtonsColor',
          type: 'Color'
        },
        {
          label: 'Links color hover',
          id: 'submenuButtonsColorOver',
          type: 'Color'
        },
        {
          label: 'Underline',
          id: 'submenuButtonsUnderline',
          type: 'Boolean'
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
    }
  ],
  defaults: {
    distance: 20,
    alignment: 'left',
    font: {},
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
    color: {
      value: '#ffffff',
      opacity: 100
    },
    colorOver: {
      value: '#ffffff',
      opacity: 100
    },
    underline: false,
    useBackground: false,
    backgroundColor: {
      value: '#ffffff',
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
    submenuVertical: 10,
    submenuHorizontal: 0,
    submenuButtonsAlignment: 'left',
    submenuBackgroundColor: {
      value: '#333333',
      opacity: 100
    },
    submenuUsePadding: false,
    submenuPadding: '0px',
    submenuUseBorder: false,
    submenuBorder: {},
    submenuUseCorners: false,
    submenuCorners: '0px',
    submenuButtonsFont: {},
    submenuButtonsFontSize: 16,
    submenuButtonsLineHeight: 16,
    submenuButtonsLetterSpacing: 0,
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
    const style = {
      menu: {
        textAlign: props.alignment
      },
      entry: {
        marginRight: props.distance
      },
      button: {
        fontSize: props.fontSize,
        lineHeight: props.lineHeight,
        letterSpacing: props.letterSpacing,
        color: getColorString(props.color),
        textDecoration: props.underline && 'underline',
        backgroundColor: props.useBackground && getColorString(props.backgroundColor),
        borderRadius: props.useCorners && props.corners,
        padding: props.usePadding && props.padding,

        ':hover': {
          color: getColorString(props.colorOver),
          backgroundColor: props.useBackground && getColorString(props.backgroundColorOver),
          borderColor: getColorString(props.borderColorOver)
        }
      },
      submenu: {
        backgroundColor: getColorString(props.submenuBackgroundColor),
        padding: props.submenuUsePadding && props.submenuPadding,
        borderRadius: props.submenuUseCorners && props.submenuCorners
      },
      submenuButton: {
        fontSize: props.submenuButtonsFontSize,
        lineHeight: props.submenuButtonsLineHeight,
        letterSpacing: props.submenuButtonsLetterSpacing,
        color: getColorString(props.submenuButtonsColor),
        textDecoration: props.submenuButtonsUnderline && 'underline',
        backgroundColor: props.submenuButtonsUseBackground && getColorString(props.submenuButtonsBackgroundColor),
        borderRadius: props.submenuButtonsUseCorners && props.submenuButtonsCorners,
        padding: props.submenuButtonsUsePadding && props.submenuButtonsPadding,
        textAlign: props.submenuButtonsAlignment,

        ':hover': {
          color: getColorString(props.submenuButtonsColorOver),
          backgroundColor:
            props.submenuButtonsUseBackground &&
            getColorString(props.submenuButtonsBackgroundColorOver),
          borderColor: getColorString(props.submenuButtonsBorderColorOver)
        }
      }
    };

    // Font
    if (props.font && props.font.family && props.font.fvd) {
      style.button.fontFamily = props.font.family;
      Utils.processFVD(style.button, props.font.fvd);
    }

    // Border
    if (props.useBorder) {
      Utils.applyBorders(style.button, props.border);
    }

    // Submenu Border
    if (props.submenuUseBorder) {
      Utils.applyBorders(style.submenu, props.submenuBorder);
    }

    // Submenu Buttons Font
    if (props.submenuButtonsFont && props.submenuButtonsFont.family && props.submenuButtonsFont.fvd) {
      style.submenuButton.fontFamily = props.submenuButtonsFont.family;
      Utils.processFVD(style.submenuButton, props.submenuButtonsFont.fvd);
    }

    // Submenu Buttons Border
    if (props.submenuButtonsUseBorder) {
      Utils.applyBorders(style.submenuButton, props.submenuButtonsBorder);
    }

    // Submenu alignment and Offset
    style.submenu.transform = `translateY(${props.submenuVertical})`;
    if (props.submenuAlignment === 'left') {
      style.submenu.left = props.submenuHorizontal;
    } else if (props.submenuAlignment === 'right') {
      style.submenu.left = 'auto';
      style.submenu.right = -props.submenuHorizontal;
    } else if (props.submenuAlignment === 'center') {
      style.submenu.left = '50%';
      style.submenu.transform = `translateX(-50%) translateY(${props.submenuVertical})`;
    }

    return style;
  }
};
