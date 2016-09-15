import css from 'helpers/styles/css';
import layoutOptions from 'helpers/styles/layout-options';

export default {
  type: 'text',
  options: [
    layoutOptions,
    {
      label: 'Font',
      type: 'Section',
      id: 'fontSection',
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
          label: 'Shadow',
          id: 'shadow',
          type: 'TextShadow'
        }
      ]
    },
    {
      label: 'Links',
      type: 'Section',
      id: 'linksSection',
      unlocks: [
        {
          type: 'Columns',
          options: [
            {
              label: 'Links color',
              id: 'linkColor',
              type: 'Color'
            },
            {
              label: 'Links color hover',
              id: 'linkColorOver',
              type: 'Color'
            }
          ]
        },
        {
          label: 'Links underline',
          id: 'linkUnderline',
          type: 'Boolean'
        }
      ]
    }
  ],
  defaults: {
    font: {},
    fontSize: '16px',
    lineHeight: '16px',
    letterSpacing: '0px',
    color: {
      value: '#ffffff',
      opacity: 100
    },
    shadow: [],
    linkUnderline: true,
    linkColor: {
      value: '#ffffff',
      opacity: 100
    },
    linkColorOver: {
      value: '#ffffff',
      opacity: 100
    }
  },
  rules: (props) => {
    const holderRule = {};
    const rule = {};

    css(holderRule)
      .setMarginPadding(props.marginPadding)
      .setDisplay(props.display)
      .setPosition(props.position);

    css(rule)
      .setProperty('fontSize', props.fontSize)
      .setProperty('lineHeight', props.lineHeight)
      .setProperty('letterSpacing', props.letterSpacing)
      .setColor(props.color)
      .setFont(props.font)
      .setTextShadows(props.shadow);

    // links
    rule.a = css({})
      .setProperty('textDecoration', props.linkUnderline ? 'underline' : 'none')
      .setColor(props.linkColor)
      .rules;
    rule.a[':hover'] = css({})
      .setColor(props.linkColorOver)
      .rules;

    return {
      holder: holderRule,
      text: rule
    };
  },
  getIdentifierLabel: (props) => {
    const variation = props.font && props.font.fvd && ` ${props.font.fvd.charAt(1)}00` || '';
    return (props.font && props.font.family || '') + variation;
  }
};
