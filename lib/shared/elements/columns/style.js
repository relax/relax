import css from 'helpers/styles/css';
import layoutOptions from 'helpers/styles/layout-options';

export default {
  type: 'columns',
  options: [
    layoutOptions,
    {
      label: 'Spacing',
      type: 'Section',
      id: 'spacingSection',
      unlocks: [
        {
          label: 'Space between columns',
          type: 'Pixels',
          id: 'spacing'
        },
        {
          label: 'Space between rows (not used on desktop)',
          type: 'Pixels',
          id: 'spacingRows'
        },
        {
          label: 'Columns Hor. Alignment',
          type: 'Percentage',
          id: 'horizontal'
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
    spacing: '30px',
    spacingRows: '10px',
    horizontal: '50%'
  },
  rules: (props) => {
    const root = css({})
      .setDisplay(props.display)
      .setPosition(props.position)
      .setMarginPadding(props.marginPadding)
      .setCustoms(props.custom)
      .rules;

    return {
      root
    };
  }
};
