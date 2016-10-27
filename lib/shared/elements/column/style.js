import React from 'react';
import css from 'helpers/styles/css';

export default {
  type: 'column',
  options: [
    {
      label: 'Layout',
      type: 'Section',
      id: 'layoutSection',
      unlocks: [
        {
          label: 'Width',
          type: 'Buttons',
          id: 'width',
          props: {
            labels: ['Auto', 'Custom', 'Block'],
            values: ['auto', 'custom', 'block']
          },
          unlocks: {
            custom: [
              {
                label: 'Custom Width',
                type: 'Number',
                id: 'widthValue',
                props: {
                  allowed: ['%', 'px']
                }
              }
            ]
          }
        },
        {
          label: 'Vertical align',
          type: 'Buttons',
          id: 'vertical',
          props: {
            labels: [
              <i className='nc-icon-outline design_align-top' />,
              <i className='nc-icon-outline design_align-center-vertical' />,
              <i className='nc-icon-outline design_align-bottom' />
            ],
            tooltips: ['Top', 'Middle', 'Bottom'],
            values: ['top', 'middle', 'bottom']
          }
        },
        {
          label: 'Padding',
          type: 'Padding',
          id: 'padding'
        }
      ]
    },
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
    width: 'auto',
    widthValue: '30%',
    vertical: 'top',
    padding: '0px',
    background: [],
    useCorners: false,
    corners: '0px',
    useBorder: false,
    shadow: []
  },
  rules: (props) => {
    const root = css({})
      .setBackground(props.background)
      .setProperty('borderRadius', props.useCorners && props.corners)
      .setBorder(props.useBorder && props.border)
      .setBoxShadows(props.shadow)
      .setProperty('verticalAlign', props.vertical)
      .setProperty('width', props.width === 'custom' && props.widthValue)
      .rules;

    const content = css({})
      .setProperty('padding', props.padding)
      .rules;

    return {
      root,
      content
    };
  }
};
