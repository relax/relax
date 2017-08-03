import Component from 'components/component';
import Draggable from 'components/dnd/draggable';
import bind from 'decorators/bind';
import velocity from 'relax-velocity-animate';
import React from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';

import Highlight from './highlight';
import styles from './element.less';

export default class Element extends Component {
  static propTypes = {
    display: PropTypes.string.isRequired,
    editing: PropTypes.bool.isRequired,
    selectable: PropTypes.bool.isRequired,
    settings: PropTypes.object.isRequired,
    element: PropTypes.object.isRequired,
    positionInParent: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    overed: PropTypes.bool.isRequired,
    selectElement: PropTypes.func.isRequired,
    htmlTag: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    isDraggable: PropTypes.bool.isRequired,
    children: PropTypes.node,
    dragging: PropTypes.bool.isRequired,
    overElement: PropTypes.func.isRequired,
    outElement: PropTypes.func.isRequired,
    onEnterScreen: PropTypes.func,
    contentElementId: PropTypes.string,
    focused: PropTypes.bool,
    disableSelection: PropTypes.bool,
    linkingDataMode: PropTypes.bool,
    context: PropTypes.object,
    isHighlightable: PropTypes.bool,
    hasAnimation: PropTypes.bool,
    isTemplate: PropTypes.bool,
    hasLink: PropTypes.bool
  };

  static defaultProps = {
    style: {},
    className: ''
  };

  componentDidMount () {
    const {editing, hasAnimation, onEnterScreen} = this.props;

    // Animation
    if (hasAnimation || onEnterScreen) {
      window.addEventListener('scroll', this.onScroll);
      this.onScroll();
    }
    if (editing) {
      window.addEventListener('animateElements', this.animationInitForce);
    }
  }

  componentWillReceiveProps (nextProps) {
    const {editing, hasAnimation, element} = this.props;

    if (editing && hasAnimation && element.animation !== nextProps.element.animation) {
      this.animationInitForce();
    }
  }

  componentWillUnmount () {
    const {editing} = this.props;

    if (this.onScroll) {
      window.removeEventListener('scroll', this.onScroll);
    }
    if (editing) {
      window.removeEventListener('animateElements', this.animationInitForce);
    }
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }

  @bind
  animate () {
    const {element, hasAnimation} = this.props;

    if (hasAnimation && !this.animating && !this.animated) {
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
    const {hasAnimation, element} = this.props;

    if (hasAnimation && !this.animating) {
      this.animationTimeout = setTimeout(
        this.animate,
        parseInt(element.animation.delay, 10)
      );
    }
  }

  @bind
  animationInitForce () {
    this.animating = false;
    this.animated = false;
    this.animationTimeout && clearTimeout(this.animationTimeout);
    velocity(findDOMNode(this), 'stop');
    this.animationInit();
  }

  @bind
  onScroll () {
    const {onEnterScreen} = this.props;
    const dom = findDOMNode(this);
    const rect = dom.getBoundingClientRect();

    if ((rect.top <= 0 && rect.bottom >= 0) || (rect.top > 0 && rect.top < window.outerHeight)) {
      this.animationInit();

      if (onEnterScreen) {
        onEnterScreen();
      }

      window.removeEventListener('scroll', this.onScroll);
    }
  }

  @bind
  onElementClick (event) {
    const {selectElement, element, context} = this.props;
    event.stopPropagation();

    selectElement(element.id, context);
  }

  processAnimationStyle (style) {
    const {hasAnimation} = this.props;

    if (hasAnimation && !this.animated && !this.animating) {
      style.opacity = 0;
    }
  }

  @bind
  onMouseOver (event) {
    const {dragging, overed, selected, overElement, element, context} = this.props;
    if (!dragging) {
      event.stopPropagation();
      clearTimeout(this.outTimeout);
      if (!overed && !selected) {
        overElement(element.id, context);
      }
    }
  }

  @bind
  onMouseOut () {
    const {dragging, overed} = this.props;
    if (!dragging && overed) {
      clearTimeout(this.outTimeout);
      this.outTimeout = setTimeout(this.selectOut, 50);
    }
  }

  @bind
  selectOut () {
    const {outElement, element, context, overed} = this.props;
    if (overed) {
      outElement(element.id, context);
    }
  }

  render () {
    const {editing, isDraggable, settings, element, positionInParent, context} = this.props;
    let result;

    if (editing && settings.drag) {
      const draggableProps = Object.assign({
        dragInfo: {
          type: 'move',
          id: element.id,
          context,
          parentId: element.parent,
          positionInParent
        },
        onClick: this.onElementClick,
        type: element.tag,
        disabled: !isDraggable
      }, settings.drag);

      result = (
        <Draggable {...draggableProps}>
          {this.renderTag()}
        </Draggable>
      );
    } else {
      result = this.renderTag();
    }

    return result;
  }

  renderTag () {
    const HtmlTag = this.props.htmlTag;
    const {style, className, selectable, isHighlightable, element} = this.props;

    const calcStyle = Object.assign({}, style);
    this.processAnimationStyle(calcStyle);

    const tagProps = {
      style: calcStyle,
      className
    };

    if (selectable) {
      tagProps.onMouseOver = this.onMouseOver;
      tagProps.onMouseOut = this.onMouseOut;
    }
    if (isHighlightable) {
      tagProps.ref = (ref) => {
        !this.state.ref && this.setState({
          ref
        });
      };
      tagProps.id = element.id;
    }

    return (
      <HtmlTag {...tagProps}>
        {this.renderContent()}
        {this.renderHighlight()}
      </HtmlTag>
    );
  }

  renderContent () {
    const {selectable, focused} = this.props;
    let result;

    if (selectable && focused) {
      result = (
        <div className={styles.focused}>
          {this.props.children}
        </div>
      );
    } else {
      result = this.props.children;
    }

    return result;
  }

  renderHighlight () {
    const {
      overed,
      selected,
      element,
      settings,
      contentElementId,
      focused,
      context,
      linkingDataMode,
      hasLink,
      isHighlightable,
      isTemplate
    } = this.props;

    if (isHighlightable && this.state.ref) {
      return (
        <Highlight
          element={element}
          settings={settings}
          overed={overed}
          selected={selected}
          focused={focused}
          hasLink={hasLink}
          contentElementId={contentElementId}
          context={context}
          linkingDataMode={linkingDataMode}
          contextMenu={!isTemplate}
          dom={this.state.ref}
        />
      );
    }
  }
}
