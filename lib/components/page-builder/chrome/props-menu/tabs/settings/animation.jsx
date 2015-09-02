import React from 'react';
import {Component} from 'relax-framework';
import OptionsList from '../../../../../options-list';
import {Types} from '../../../../../../data-types';
import cloneDeep from 'lodash.clonedeep';

export default class AnimationTab extends Component {

  onChange (id, value) {
    var values = cloneDeep(this.context.selected.animation || AnimationTab.defaults);
    values[id] = value;

    this.context.setElementAnimation(values);
  }

  playAnimations (event) {
    event.preventDefault();
    /* jshint ignore:start */
    window.dispatchEvent(new Event('animateElements'));
    /* jshint ignore:end */
  }

  renderContent () {
    if (this.context.selected) {
      var values = this.context.selected.animation || AnimationTab.defaults;

      return (
        <OptionsList options={AnimationTab.options} onChange={this.onChange.bind(this)} values={values} />
      );
    } else {
      return (
        <p>You need select an element first</p>
      );
    }
  }

  render () {
    return (
      <div className='advanced-menu-animation'>
        {this.renderContent()}
        <a href='#' onClick={this.playAnimations.bind(this)} className='button full button-primary'>Play animations</a>
      </div>
    );
  }
}

AnimationTab.contextTypes = {
  selected: React.PropTypes.any.isRequired,
  setElementAnimation: React.PropTypes.func.isRequired
};

AnimationTab.defaults = {
  use: false,
  effect: 'transition.fadeIn',
  duration: 400,
  delay: 300
};

AnimationTab.options = [
  {
    label: 'Animation',
    type: 'Optional',
    id: 'use',
    unlocks: [
      {
        label: 'Effect',
        type: Types.Select,
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
        },
      },
      {
        label: 'Duration',
        type: Types.Number,
        id: 'duration',
        props: {
          min: 0,
          max: 20000,
          label: 'ms'
        }
      },
      {
        label: 'Delay',
        type: Types.Number,
        id: 'delay',
        props: {
          min: 0,
          max: 20000,
          label: 'ms'
        }
      }
    ]
  }
];
