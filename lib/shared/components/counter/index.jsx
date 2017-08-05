import React from 'react';
import PropTypes from 'prop-types';

import Component from 'components/component';
import bind from 'decorators/bind';
import ease from 'ease-component';
import raf from 'raf';

export default class Counter extends Component {
  static propTypes = {
    begin: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    easing: PropTypes.string
  };

  getInitState () {
    return {
      value: this.props.begin
    };
  }

  componentDidMount () {
    this.start = Date.now();
    raf(this.animate);
  }

  componentWillUnmount () {
    this.unmounted = true;
  }

  @bind
  animate () {
    if (this.stop) return;

    raf(this.animate);
    this.draw();
  }

  draw () {
    if (this.unmounted) return;

    const {time, begin, end, easing} = this.props;

    const finalEasing = easing && easing in ease ? easing : 'outCube';

    const now = Date.now();
    if (now - this.start >= time) this.stop = true;

    let percentage = (now - this.start) / time;
    percentage = percentage > 1 ? 1 : percentage;

    const easeVal = ease[finalEasing](percentage);
    const val = begin + (end - begin) * easeVal;

    this.setState({value: val});
  }

  render () {
    return (
      <span>
        {Math.round(this.state.value)}
      </span>
    );
  }
}
