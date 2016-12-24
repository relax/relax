import css from 'helpers/styles/css';
import layoutOptions from 'helpers/styles/layout-options';

export default {
  type: 'google-maps',
  options: [
    layoutOptions,
    {
      label: 'Size',
      type: 'Section',
      id: 'sizeSection',
      unlocks: [
        {
          label: 'Height',
          type: 'Pixels',
          id: 'height'
        }
      ]
    }
  ],
  defaults: {
    height: '250px'
  },
  rules: (props) => {
    const root = css({})
      .setDisplay(props.display)
      .setPosition(props.position)
      .setMarginPadding(props.marginPadding)
      .rules;

    const holder = css({})
      .setProperty('height', props.height)
      .rules;

    return {
      root,
      holder
    };
  }
};
