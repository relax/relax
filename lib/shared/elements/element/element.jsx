import bind from 'decorators/bind';
import getElementCss from 'helpers/get-element-css';
import velocity from 'velocity-animate';
import Component from 'components/component';
import Draggable from 'components/dnd/draggable';
import Droppable from 'components/dnd/droppable';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import styles from './element.less';
import Empty from './empty';
import Highlight from './highlight';

export default class Element extends Component {
  static propTypes = {
    display: PropTypes.string.isRequired,
    editing: PropTypes.bool.isRequired,
    settings: PropTypes.object.isRequired,
    element: PropTypes.object.isRequired,
    positionInParent: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    overed: PropTypes.bool.isRequired,
    selectElement: PropTypes.func.isRequired,
    htmlTag: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    animation: PropTypes.bool,
    animated: PropTypes.bool.isRequired,
    animatedEditing: PropTypes.bool.isRequired,
    children: PropTypes.node,
    dragging: PropTypes.bool.isRequired,
    overElement: PropTypes.func.isRequired,
    outElement: PropTypes.func.isRequired,
    onEnterScreen: PropTypes.func,
    startAnimation: PropTypes.func.isRequired,
    resetAnimation: PropTypes.func.isRequired,
    contentElementId: PropTypes.string,
    focused: PropTypes.bool,
    disableSelection: PropTypes.bool,
    linkingDataMode: PropTypes.bool,
    context: PropTypes.string,
    isHighlightable: PropTypes.bool,
    hasAnimation: PropTypes.bool,
    elementLinks: PropTypes.array
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

  processCss (style) {
    const {element, display} = this.props;
    Object.assign(style, getElementCss(element, display));
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
      this.outTimeout = setTimeout(this.selectOut, 50);
    }
  }

  @bind
  selectOut () {
    const {outElement, element, context} = this.props;
    outElement(element.id, context);
  }

  render () {
    const {editing, settings, element, positionInParent, selected, disableSelection, context} = this.props;
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
        disabled: disableSelection || (selected && settings.drag.dragSelected === false)
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
    const {style, className, editing, isHighlightable, element, disableSelection} = this.props;

    const calcStyle = Object.assign({}, style);
    this.processAnimationStyle(calcStyle);
    this.processCss(calcStyle);

    const tagProps = {
      style: calcStyle,
      className
    };

    if (editing && !disableSelection) {
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
    const {editing, settings, element, focused, disableSelection, context} = this.props;
    let result;

    if (editing && !disableSelection && settings.drop && !settings.drop.customDropArea) {
      const droppableProps = Object.assign({
        dropInfo: {
          id: element.id,
          context
        },
        type: element.tag,
        placeholder: true,
        placeholderRender: this.renderPlaceholder
      }, settings.drop);

      result = (
        <Droppable {...droppableProps}>
          {this.props.children}
        </Droppable>
      );
    } else {
      result = this.props.children;
    }

    if (editing && focused) {
      result = (
        <div className={styles.focused}>{result}</div>
      );
    }

    return result;
  }

  @bind
  renderPlaceholder (options) {
    const {settings, element} = this.props;
    return (
      <Empty {...options} settings={settings} element={element} />
    );
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
      elementLinks,
      isHighlightable
    } = this.props;

    if (isHighlightable && this.state.ref) {
      return (
        <Highlight
          element={element}
          settings={settings}
          overed={overed}
          selected={selected}
          focused={focused}
          elementLinks={elementLinks}
          contentElementId={contentElementId}
          context={context}
          linkingDataMode={linkingDataMode}
          dom={this.state.ref}
        />
      );
    }
  }
}
