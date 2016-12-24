import bind from 'decorators/bind';
import Button from 'components/button';
import Component from 'components/component';
import OptionsList from 'components/options-list';
import React, {PropTypes} from 'react';

export default class AnimationTab extends Component {
  static propTypes = {
    pageBuilderActions: PropTypes.object.isRequired,
    selected: PropTypes.object,
    selectedElement: PropTypes.object
  };

  static options = [
    {
      label: 'Animation',
      type: 'Optional',
      id: 'use',
      unlocks: [
        {
          label: 'Effect',
          type: 'Select',
          id: 'effect',
          props: {
            labels: [
              'Fade',
              'Flip X',
              'Flip Y',
              'Whirl',
              'Shrink',
              'Expand',
              'Slide up',
              'Slide down',
              'Slide left',
              'Slide right',
              'Slide big up',
              'Slide big down',
              'Slide big left',
              'Slide big right'
            ],
            values: [
              'transition.fadeIn',
              'transition.flipXIn',
              'transition.flipYIn',
              'transition.whirlIn',
              'transition.shrinkIn',
              'transition.expandIn',
              'transition.slideUpIn',
              'transition.slideDownIn',
              'transition.slideLeftIn',
              'transition.slideRightIn',
              'transition.slideUpBigIn',
              'transition.slideDownBigIn',
              'transition.slideLeftBigIn',
              'transition.slideRightBigIn'
            ]
          }
        },
        {
          type: 'Columns',
          options: [
            {
              label: 'Duration',
              type: 'Number',
              id: 'duration',
              props: {
                min: 0,
                max: 20000,
                label: 'ms'
              }
            },
            {
              label: 'Delay',
              type: 'Number',
              id: 'delay',
              props: {
                min: 0,
                max: 20000,
                label: 'ms'
              }
            }
          ]
        }

      ]
    }
  ];

  @bind
  onChange (id, value) {
    const {selected} = this.props;
    const {changeElementAnimation} = this.props.pageBuilderActions;
    changeElementAnimation(selected.id, id, value, selected.context);
  }

  @bind
  playAnimations (event) {
    event.preventDefault();
    window.dispatchEvent(new Event('animateElements'));
  }

  render () {
    return (
      <div>
        {this.renderContent()}
        <Button onClick={this.playAnimations} full primary>
          Play animations
        </Button>
      </div>
    );
  }

  renderContent () {
    const {selectedElement} = this.props;
    return (
      <OptionsList
        options={AnimationTab.options}
        onChange={this.onChange}
        values={selectedElement.animation || {}}
      />
    );
  }
}
