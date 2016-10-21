import {getBorderValue, getMarginPadding} from 'helpers/styles/helpers';

import React from 'react';
import css from 'helpers/styles/css';
import layoutOptions from 'helpers/styles/layout-options';

const widthOption = {
  label: 'Width',
  id: 'width',
  type: 'Number',
  props: {
    allowed: ['px', '%', 'auto']
  }
};
const heightOption = {
  label: 'Height',
  id: 'height',
  type: 'Number',
  props: {
    allowed: ['px', '%', 'auto']
  }
};

export default {
  type: 'mobileMenu',
  options: [
    layoutOptions,
    {
      label: 'Icon',
      type: 'Section',
      id: 'iconSection',
      unlocks: [
        {
          label: 'Icon',
          type: 'Icon',
          id: 'icon'
        },
        {
          label: 'Alignment',
          id: 'iconAlignment',
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
              label: 'Icon Size',
              id: 'iconSize',
              type: 'Number',
              props: {
                allowed: ['px', 'em', 'pt']
              }
            },
            {
              label: 'Color',
              type: 'Color',
              id: 'color'
            }
          ]
        },
        {
          type: 'Columns',
          options: [
            {
              label: 'Width',
              type: 'Pixels',
              id: 'iconWidth'
            },
            {
              label: 'Height',
              type: 'Pixels',
              id: 'iconHeight'
            }
          ]
        },
        {
          label: 'Use Background',
          type: 'Optional',
          id: 'useBackground',
          unlocks: [
            {
              type: 'Color',
              id: 'background'
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
      label: 'Menu',
      type: 'Section',
      id: 'menuSection',
      unlocks: [
        {
          label: 'Layout',
          type: 'Buttons',
          id: 'layout',
          props: {
            labels: [
              <i className='nc-icon-outline arrows-2_hit-right' />,
              <i className='nc-icon-outline arrows-2_hit-left' />,
              <i className='nc-icon-outline arrows-2_hit-down' />,
              <i className='nc-icon-outline arrows-2_hit-up' />,
              <i className='nc-icon-outline arrows-3_square-enlarge' />
            ],
            values: [
              'left',
              'right',
              'top',
              'bottom',
              'full'
            ],
            tooltips: [
              'Left',
              'Right',
              'Top',
              'Bottom',
              'Full'
            ]
          },
          unlocks: {
            left: [widthOption],
            right: [widthOption],
            top: [heightOption],
            bottom: [heightOption]
          }
        },
        {
          label: 'Padding and Margin',
          type: 'MarginPadding',
          id: 'menuMarginPadding'
        },
        {
          label: 'Buttons alignment',
          type: 'Buttons',
          id: 'align',
          props: {
            labels: [
              <i className='nc-icon-outline text_align-left' />,
              <i className='nc-icon-outline text_align-center' />,
              <i className='nc-icon-outline text_align-right' />
            ],
            values: ['left', 'center', 'right'],
            tooltips: ['Left', 'Center', 'Right']
          }
        },
        {
          label: 'Background',
          type: 'Background',
          id: 'menuBackground'
        }
      ]
    },
    {
      label: 'Menu Buttons',
      type: 'Section',
      id: 'buttonsSection',
      unlocks: [
        {
          label: 'Font Family',
          id: 'buttonsFont',
          type: 'Font'
        },
        {
          type: 'Columns',
          options: [
            {
              label: 'Font Size',
              id: 'buttonsFontSize',
              type: 'Number',
              props: {
                allowed: ['px', 'em', 'pt']
              }
            },
            {
              label: 'Line Height',
              id: 'buttonsLineHeight',
              type: 'Pixels'
            }
          ]
        },
        {
          type: 'Columns',
          options: [
            {
              label: 'Letter Spacing',
              id: 'buttonsLetterSpacing',
              type: 'Number',
              props: {
                allowed: ['px', 'em', 'pt']
              }
            },
            {
              label: 'Color',
              id: 'buttonsColor',
              type: 'Color'
            }
          ]
        },
        {
          label: 'Shadow',
          id: 'buttonsShadow',
          type: 'TextShadow'
        },
        {
          label: 'Padding and Margin',
          type: 'MarginPadding',
          id: 'buttonsMarginPadding'
        },
        {
          label: 'Buttons size',
          type: 'Buttons',
          id: 'buttonsSize',
          props: {
            labels: ['Fit content', 'Full Width'],
            values: ['inline-block', 'block']
          }
        },
        {
          label: 'Background',
          type: 'Optional',
          id: 'buttonsUseBackground',
          unlocks: [
            {
              type: 'Color',
              id: 'buttonsBackgroundColor'
            }
          ]
        },
        {
          label: 'Border',
          type: 'Optional',
          id: 'buttonsUseBorder',
          unlocks: [
            {
              type: 'Border',
              id: 'buttonsBorder'
            }
          ]
        },
        {
          label: 'Rounded Corners',
          type: 'Optional',
          id: 'buttonsUseCorners',
          unlocks: [
            {
              type: 'Corners',
              id: 'buttonsCorners'
            }
          ]
        }
      ]
    },
    {
      label: 'Submenu',
      type: 'Section',
      id: 'submenuSection',
      unlocks: [
        {
          label: 'Padding and Margin',
          type: 'MarginPadding',
          id: 'submenuMarginPadding'
        },
        {
          label: 'Background',
          type: 'Optional',
          id: 'submenuUseBackground',
          unlocks: [
            {
              type: 'Color',
              id: 'submenuBackgroundColor'
            }
          ]
        }
      ]
    },
    {
      label: 'Submenu Buttons',
      type: 'Section',
      id: 'subButtonsSection',
      unlocks: [
        {
          label: 'Font Family',
          id: 'subButtonsFont',
          type: 'Font'
        },
        {
          type: 'Columns',
          options: [
            {
              label: 'Font Size',
              id: 'subButtonsFontSize',
              type: 'Number',
              props: {
                allowed: ['px', 'em', 'pt']
              }
            },
            {
              label: 'Line Height',
              id: 'subButtonsLineHeight',
              type: 'Pixels'
            }
          ]
        },
        {
          type: 'Columns',
          options: [
            {
              label: 'Letter Spacing',
              id: 'subButtonsLetterSpacing',
              type: 'Number',
              props: {
                allowed: ['px', 'em', 'pt']
              }
            },
            {
              label: 'Color',
              id: 'subButtonsColor',
              type: 'Color'
            }
          ]
        },
        {
          label: 'Shadow',
          id: 'subButtonsShadow',
          type: 'TextShadow'
        },
        {
          label: 'Padding and Margin',
          type: 'MarginPadding',
          id: 'subButtonsMarginPadding'
        },
        {
          label: 'Buttons size',
          type: 'Buttons',
          id: 'subButtonsSize',
          props: {
            labels: ['Fit content', 'Full Width'],
            values: ['inline-block', 'block']
          }
        },
        {
          label: 'Background',
          type: 'Optional',
          id: 'subButtonsUseBackground',
          unlocks: [
            {
              type: 'Color',
              id: 'subButtonsBackgroundColor'
            }
          ]
        },
        {
          label: 'Border',
          type: 'Optional',
          id: 'subButtonsUseBorder',
          unlocks: [
            {
              type: 'Border',
              id: 'subButtonsBorder'
            }
          ]
        },
        {
          label: 'Rounded Corners',
          type: 'Optional',
          id: 'subButtonsUseCorners',
          unlocks: [
            {
              type: 'Corners',
              id: 'subButtonsCorners'
            }
          ]
        }
      ]
    }
  ],
  defaults: {
    icon: {
      family: 'fontawesome',
      className: 'fa fa-bars'
    },
    iconSize: '20px',
    iconAlignment: 'left',
    iconWidth: '40px',
    iconHeight: '40px',
    useBackground: false,
    color: {
      value: '#333333'
    },
    background: {
      value: '#ffffff'
    },
    userBorder: false,
    border: getBorderValue({
      size: 1,
      color: '#cccccc'
    }),
    useCorners: false,
    corners: '0px',

    // menu
    layout: 'right',
    width: '400px',
    height: 'auto',
    menuMarginPadding: getMarginPadding('10px', '0px'),
    align: 'left',

    // menu buttons
    buttonsFont: {},
    buttonsFontSize: '16px',
    buttonsLineHeight: '16px',
    buttonsLetterSpacing: '0px',
    buttonsColor: {
      value: '#ffffff'
    },
    buttonsMarginPadding: getMarginPadding('5px 10px', '0px'),
    buttonsSize: 'block',
    buttonsUseBackground: false,
    buttonsBackgroundColor: {
      value: '#333333'
    },
    buttonsUseBorder: false,
    buttonsBorder: getBorderValue({
      size: 1,
      color: '#cccccc'
    }),
    buttonsUseCorners: false,
    buttonsCorners: '0px',

    // submenu
    submenuMarginPadding: getMarginPadding('0px 0px 0px 30px', '0px'),
    submenuUseBackground: false,
    submenuBackgroundColor: {
      value: '#333333'
    },

    // submenu buttons
    subButtonsFont: {},
    subButtonsFontSize: '14px',
    subButtonsLineHeight: '16px',
    subButtonsLetterSpacing: '0px',
    subButtonsColor: {
      value: '#ffffff'
    },
    subButtonsMarginPadding: getMarginPadding('5px 10px', '0px'),
    subButtonsSize: 'block',
    subButtonsUseBackground: false,
    subButtonsBackgroundColor: {
      value: '#333333'
    },
    subButtonsUseBorder: false,
    subButtonsBorder: getBorderValue({
      size: 1,
      color: '#cccccc'
    }),
    subButtonsUseCorners: false,
    subButtonsCorners: '0px'
  },
  rules: (props) => {
    const root = css({})
      .setDisplay(props.display)
      .setPosition(props.position)
      .setMarginPadding(props.marginPadding)
      .setProperty('textAlign', props.iconAlignment)
      .rules;

    let bordersValue = 0;
    if (props.useBorder && props.border) {
      bordersValue = parseInt(props.border.bottom.width, 10) + parseInt(props.border.top.width, 10);
    }

    const icon = css({})
      .setColor(props.color)
      .setProperty('fontSize', props.iconSize)
      .setProperty('width', props.iconWidth)
      .setProperty('height', props.iconHeight)
      .setProperty('lineHeight', `${parseInt(props.iconHeight, 10) - bordersValue}px`)
      .setBorder(props.useBorder && props.border)
      .setProperty('borderRadius', props.useCorners && props.corners)
      .when(props.useBackground)
        .setBackgroundColor(props.background)
      .rules;

    const menu = css({})
      .setMarginPadding(props.menuMarginPadding)
      .setBackground(props.menuBackground)
      .setProperty('text-align', props.align)
      .when(props.layout === 'left' || props.layout === 'right')
        .setProperty('top', '0px')
        .setProperty('bottom', '0px')
        .setProperty('width', props.width)
      .when(props.layout === 'left')
        .setProperty('left', '0px')
      .when(props.layout === 'right')
        .setProperty('right', '0px')
      .when(props.layout === 'top' || props.layout === 'bottom')
        .setProperty('left', '0px')
        .setProperty('right', '0px')
        .setProperty('height', props.height)
      .when(props.layout === 'top')
        .setProperty('top', '0px')
      .when(props.layout === 'bottom')
        .setProperty('bottom', '0px')
      .when(props.layout === 'full')
        .setProperty('top', '0px')
        .setProperty('bottom', '0px')
        .setProperty('left', '0px')
        .setProperty('right', '0px')
      .rules;

    const menuButtonLi = css({})
      .setMargin(props.buttonsMarginPadding)
      .rules;

    const menuButton = css({})
      .setPadding(props.buttonsMarginPadding)
      .setFont(props.buttonsFont)
      .setProperty('fontSize', props.buttonsFontSize)
      .setProperty('lineHeight', props.buttonsLineHeight)
      .setProperty('letterSpacing', props.buttonsLetterSpacing)
      .setColor(props.buttonsColor)
      .setTextShadows(props.buttonsShadow)
      .setProperty('display', props.buttonsSize)
      .setBackgroundColor(props.buttonsUseBackground && props.buttonsBackgroundColor)
      .setBorder(props.buttonsUseBorder && props.buttonsBorder)
      .setProperty('borderRadius', props.buttonsUseCorners && props.buttonsCorners)
      .rules;

    const submenu = css({})
      .setMarginPadding(props.submenuMarginPadding)
      .setBackgroundColor(props.submenuUseBackground && props.submenuBackgroundColor)
      .rules;

    const submenuButton = css({})
      .setMarginPadding(props.subButtonsMarginPadding)
      .setFont(props.subButtonsFont)
      .setProperty('fontSize', props.subButtonsFontSize)
      .setProperty('lineHeight', props.subButtonsLineHeight)
      .setProperty('letterSpacing', props.subButtonsLetterSpacing)
      .setColor(props.subButtonsColor)
      .setTextShadows(props.subButtonsShadow)
      .setProperty('display', props.subButtonsSize)
      .setBackgroundColor(props.subButtonsUseBackground && props.subButtonsBackgroundColor)
      .setBorder(props.subButtonsUseBorder && props.subButtonsBorder)
      .setProperty('borderRadius', props.subButtonsUseCorners && props.subButtonsCorners)
      .rules;

    return {
      root,
      icon,
      menu,
      menuButtonLi,
      menuButton,
      submenu,
      submenuButton
    };
  }
};
