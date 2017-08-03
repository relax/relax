import Component from 'components/component';
import bind from 'decorators/bind';
import velocity from 'relax-velocity-animate';
import React from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';

export default class Element extends Component {
  static propTypes = {
    htmlTag: PropTypes.string.isRequired,
    children: PropTypes.any,
    style: PropTypes.object,
    className: PropTypes.string,
    element: PropTypes.object.isRequired,
    onEnterScreen: PropTypes.func
  };

  componentDidMount () {
    const {onEnterScreen} = this.props;

    // Animation
    if (this.hasAnimation() || onEnterScreen) {
      window.addEventListener('scroll', this.onScroll);
      this.onScroll();
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll);

    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }

  @bind
  onScroll () {
    const dom = findDOMNode(this);
    const rect = dom.getBoundingClientRect();

    if ((rect.top <= 0 && rect.bottom >= 0) || (rect.top > 0 && rect.top < window.outerHeight)) {
      const {onEnterScreen} = this.props;
      this.animationInit();

      if (onEnterScreen) {
        onEnterScreen();
      }

      window.removeEventListener('scroll', this.onScroll);
    }
  }

  @bind
  animate () {
    const {element} = this.props;

    if (this.hasAnimation() && !this.animating && !this.animated) {
      const dom = findDOMNode(this);
      this.animating = true;

      velocity.hook(dom, 'opacity', 0);
      velocity(dom, element.animation.effect, {
        duration: parseInt(element.animation.duration, 10),
        display: null,
        complete: () => {
          this.animating = false;
          this.animated = true;
        }
      });
    }
  }

  @bind
  animationInit () {
    const {element} = this.props;

    if (this.hasAnimation() && !this.animating) {
      this.animationTimeout = setTimeout(
        this.animate,
        parseInt(element.animation.delay, 10)
      );
    }
  }

  hasAnimation () {
    const {element} = this.props;
    return element.animation && element.animation.use;
  }

  processAnimationStyle (style) {
    if (this.hasAnimation() && !this.animated && !this.animating) {
      style.opacity = 0;
    }
  }

  render () {
    const HtmlTag = this.props.htmlTag;
    const {style, className} = this.props;

    const calcStyle = Object.assign({}, style);
    this.processAnimationStyle(calcStyle);

    const tagProps = {
      style: calcStyle,
      className
    };

    return (
      <HtmlTag {...tagProps}>
        {this.props.children}
      </HtmlTag>
    );
  }

  static renderContent ({children}) {
    return children;
  }
}
