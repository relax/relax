import getElementPosition from 'helpers/get-element-position';
import utils from 'helpers/utils';
import Component from 'components/component';
import Draggable from 'components/dnd/draggable';
import Droppable from 'components/dnd/droppable';
import React, {PropTypes} from 'react';

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
    animation: PropTypes.bool.isRequired,
    animated: PropTypes.bool.isRequired,
    children: PropTypes.node,
    dragging: PropTypes.bool.isRequired,
    overElement: PropTypes.func.isRequired,
    outElement: PropTypes.func.isRequired
  };

  static defaultProps = {
    style: {},
    className: ''
  };

  onElementClick (event) {
    const {selectElement, element} = this.props;
    event.stopPropagation();
    selectElement(element.id);
  }

  processAnimationStyle (style) {
    const {animation, animated} = this.props;
    if (animation && !animated) {
      style.opacity = 0;
    }
  }

  processPosition (style) {
    const {element, display, editing} = this.props;
    Object.assign(style, getElementPosition(element, display));

    if (editing) {
      if (style.position === 'fixed') {
        if (style.top !== 'auto') {
          if (utils.isPercentage(style.top)) {
            const value = (1 - parseInt(style.top, 10) / 100) * 45;
            style.top = `calc(${style.top} + ${value}px)`;
          } else {
            style.top = `calc(${style.top} + 45px)`;
          }
        }
        if (style.bottom !== 'auto' && utils.isPercentage(style.bottom)) {
          const value = parseInt(style.bottom, 10) / 100 * 45;
          style.bottom = `calc(${style.bottom} - ${value}px)`;
        }
        if (style.right !== 'auto') {
          if (utils.isPercentage(style.right)) {
            const value = (1 - parseInt(style.right, 10) / 100) * 280;
            style.right = `calc(${style.right} + ${value}px)`;
          } else {
            style.right = `calc(${style.right} + 280px)`;
          }
        }
        if (style.left !== 'auto' && utils.isPercentage(style.left)) {
          const value = parseInt(style.left, 10) / 100 * 280;
          style.left = `calc(${style.left} - ${value}px)`;
        }
      }
    }
  }

  onMouseOver (event) {
    const {dragging, overed, selected, overElement, element} = this.props;
    if (!dragging) {
      event.stopPropagation();
      clearTimeout(this.outTimeout);
      if (!overed && !selected) {
        const offset = this.getOffset();
        overElement(element.id);
        this.state.offset = offset;
      }
    }
  }

  onMouseOut () {
    const {dragging, overed} = this.props;
    if (!dragging && overed) {
      this.outTimeout = setTimeout(::this.selectOut, 50);
    }
  }

  selectOut () {
    const {outElement, element} = this.props;
    outElement(element.id);
  }

  render () {
    const {editing, settings, element, positionInParent, selected} = this.props;
    let result;

    if (editing && settings.drag) {
      const draggableProps = Object.assign({
        dragInfo: {
          type: 'move',
          id: element.id,
          parentId: element.parent,
          positionInParent
        },
        onClick: ::this.onElementClick,
        type: element.tag,
        disabled: (selected && settings.drag.dragSelected === false)
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
    const {style, className, editing, element} = this.props;

    this.processAnimationStyle(style);
    this.processPosition(style);

    const tagProps = {
      style,
      className
    };

    if (editing) {
      tagProps.onMouseOver = ::this.onMouseOver;
      tagProps.onMouseOut = ::this.onMouseOut;
      tagProps.ref = (ref) => this.ref = ref;
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
    const {editing, settings, element} = this.props;
    let result;

    if (editing && settings.drop && !settings.drop.customDropArea) {
      const droppableProps = Object.assign({
        dropInfo: {
          id: element.id
        },
        type: element.tag,
        placeholder: true
      }, settings.drop);

      result = (
        <Droppable {...droppableProps}>
          {this.props.children}
        </Droppable>
      );
    } else {
      result = this.props.children;
    }

    return result;
  }

  renderHighlight () {
    const {editing, selected, overed, dragging, element, settings} = this.props;
    if (editing && (selected || overed) && dragging && this.ref) {
      return (
        <Highlight
          element={element}
          settings={settings}
          selected={selected}
          dom={this.ref}
        />
      );
    }
  }
}
