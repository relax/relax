import css from 'helpers/styles/css';
import layoutOptions from 'helpers/styles/layout-options';

export default {
  type: 'video',
  options: [
    layoutOptions,
    {
      label: 'Size',
      type: 'Section',
      id: 'sizeSection',
      unlocks: [
        {
          label: 'Video Height',
          type: 'Percentage',
          id: 'videoHeight',
          props: {
            max: 200
          }
        }
      ]
    }
  ],
  defaults: {
    videoHeight: '56%'
  },
  rules: (props) => {
    const root = css({})
      .setDisplay(props.display)
      .setPosition(props.position)
      .setMarginPadding(props.marginPadding)
      .rules;

    return {
      root
    };
  }
};
