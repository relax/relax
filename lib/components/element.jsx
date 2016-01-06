import cx from 'classnames';
import Velocity from 'velocity-animate';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Component} from 'relax-framework';

import Utils from '../utils';
import {Droppable, Draggable} from './dnd';

export default class Element extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    info: PropTypes.object,
    onEnterScreen: PropTypes.func,
    htmlTag: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
  }

  getInitState () {
    const editing = this.props.info.pageBuilder && this.props.info.pageBuilder.editing;
    if (editing && this.isClient()) {
      this.animationEditingBind = this.animationEditing.bind(this);
      window.addEventListener('animateElements', this.animationEditingBind);
    }

    return {
      offset: {top: 0},
      animation: this.props.info.element.animation && this.props.info.element.animation.use,
      animated: false,
      animatedEditing: false
    };
  }

  componentDidMount () {
    const editing = this.props.info.pageBuilder && this.props.info.pageBuilder.editing;
    this.state.offset = this.getOffset();

    if ((!editing && this.state.animation) || this.props.onEnterScreen) {
      this.onScrollBind = this.onScroll.bind(this);
      window.addEventListener('scroll', this.onScrollBind);
      this.onScroll();
    }
  }

  componentWillReceiveProps (nextProps) {
    const editing = nextProps.info.pageBuilder && nextProps.info.pageBuilder.editing;
    if (editing && this.state.animation !== (this.props.info.element.animation && this.props.info.element.animation.use)) {
      this.setState({
        animation: this.props.info.element.animation && this.props.info.element.animation.use
      });
    }
  }

  componentWillUnmount () {
    if (this.onScrollBind) {
      window.removeEventListener('scroll', this.onScrollBind);
    }
    if (this.animationEditingBind) {
      window.removeEventListener('animateElements', this.animationEditingBind);
    }
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }

  animate () {
    const dom = findDOMNode(this);
    const animation = this.props.info.element.animation;
    this.state.animated = true;
    this.state.animatedEditing = false;
    Velocity(dom, animation.effect, {
      duration: animation.duration,
      display: null
    });
  }

  animationInit () {
    if (this.state.animation) {
      const animation = this.props.info.element.animation;
      this.animationTimeout = setTimeout(this.animate.bind(this), animation.delay);
    }
  }

  animationEditing () {
    if (this.state.animation) {
      this.setState({
        animated: false,
        animatedEditing: true
      });
      this.animationInit();
    }
  }

  onScroll () {
    const dom = findDOMNode(this);
    const rect = dom.getBoundingClientRect();

    if ((rect.top <= 0 && rect.bottom >= 0) || (rect.top > 0 && rect.top < window.outerHeight)) {
      if (this.state.animation) {
        this.animationInit();
      }
      if (this.props.onEnterScreen) {
        this.props.onEnterScreen();
      }
      window.removeEventListener('scroll', this.onScrollBind);
    }
  }

  onElementClick (event) {
    const {selectElement} = this.props.info.pageBuilderActions;
    event.stopPropagation();
    selectElement(this.props.info.elementId);
  }

  getOffset () {
    const dom = findDOMNode(this);
    return Utils.getOffsetRect(dom);
  }

  onMouseOver (event) {
    const {dragging} = this.props.info.dnd;
    const {overElement} = this.props.info.pageBuilderActions;
    if (!dragging) {
      event.stopPropagation();
      clearTimeout(this.outTimeout);
      if (!this.isOvered() && !this.isSelected()) {
        const offset = this.getOffset();
        overElement(this.props.info.elementId);
        this.state.offset = offset;
      }
    }
  }

  onMouseOut () {
    const {dragging} = this.props.info.dnd;
    if (!dragging && this.isOvered()) {
      this.outTimeout = setTimeout(this.selectOut.bind(this), 50);
    }
  }

  selectOut () {
    const {outElement} = this.props.info.pageBuilderActions;
    outElement(this.props.info.elementId);
  }

  isOvered () {
    const {overedId} = this.props.info.pageBuilder;
    return (overedId && this.props.info.elementId === overedId);
  }

  isSelected () {
    const {selectedId} = this.props.info.pageBuilder;
    return (selectedId && this.props.info.elementId === selectedId);
  }

  render () {
    let result;
    const {children, settings, info, onEnterScreen, htmlTag, ...tagProps} = this.props;
    const {element, elementId, positionInParent, pageBuilder, dnd, dndActions} = info;
    const editing = pageBuilder && pageBuilder.editing;

    if (editing && settings.drag) {
      const {selectedParent} = pageBuilder;
      const overed = this.isOvered();
      const selected = this.isSelected();
      const {dragging, dragInfo} = dnd;

      if ((!dragging && (overed || selected)) || dragging || selectedParent === elementId) {
        tagProps.style = tagProps.style || {};
        tagProps.style.position = tagProps.style.position || 'relative';
      }

      if (this.state.animatedEditing && this.state.animation && !this.state.animated) {
        tagProps.style = tagProps.style || {};
        tagProps.style.opacity = 0;
      }

      if (element.subComponent) {
        result = (
          <this.props.htmlTag {...tagProps} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)} onClick={this.onElementClick.bind(this)}>
            {this.renderContent()}
            {this.renderHighlight()}
          </this.props.htmlTag>
        );
      } else {
        const draggableProps = Object.assign({
          dragInfo: {
            type: 'move',
            id: elementId,
            parentId: element.parent,
            positionInParent
          },
          onClick: this.onElementClick.bind(this),
          type: element.tag,
          disabled: (selected && settings.drag.dragSelected === false)
        }, settings.drag);

        if (pageBuilder.focusElementId === elementId) {
          tagProps.style = tagProps.style || {};
          tagProps.style.position = tagProps.style.position || 'relative';
          tagProps.style.boxShadow = '0 0 0 99999px rgba(0, 0, 0, 0.8)';
          tagProps.style.zIndex = 999;
        }
        if (dragging && dragInfo.id === elementId) {
          tagProps.style = tagProps.style || {};
          tagProps.style.opacity = 0.5;
        }

        if (element.position) {
          tagProps.style = tagProps.style || {};
          Object.assign(tagProps.style, element.position);
          if (tagProps.style.position === 'fixed' && tagProps.style.top !== 'auto') {
            tagProps.style.top = `calc(${tagProps.style.top} + 45px)`;
          }
        }

        result = (
          <Draggable {...draggableProps} dnd={dnd} dndActions={dndActions}>
            <this.props.htmlTag {...tagProps} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)} id={elementId}>
              {this.renderContent()}
              {this.renderHighlight()}
            </this.props.htmlTag>
          </Draggable>
        );
      }
    } else {
      if (this.state.animation && !this.state.animated) {
        tagProps.style = tagProps.style || {};
        tagProps.style.opacity = 0;
      }

      if (element.position) {
        tagProps.style = tagProps.style || {};
        Object.assign(tagProps.style, element.position);
      }

      result = (
        <this.props.htmlTag {...tagProps}>
          {this.renderContent()}
        </this.props.htmlTag>
      );
    }
    return result;
  }

  renderContent () {
    const {settings, info} = this.props;
    const {element, elementId, pageBuilder, pageBuilderActions, dnd, dndActions} = info;
    const editing = pageBuilder && pageBuilder.editing;
    let result;
    if (editing && settings.drop && !settings.drop.customDropArea) {
      const dropInfo = {
        id: elementId
      };

      result = (
        <Droppable
          type={element.tag}
          dropInfo={dropInfo}
          {...settings.drop}
          placeholder
          dnd={dnd}
          dndActions={dndActions}
          pageBuilder={pageBuilder}
          pageBuilderActions={pageBuilderActions}>
          {this.props.children}
        </Droppable>
      );
    } else {
      result = this.props.children;
    }
    return result;
  }

  renderEmpty (renderMark, addEvent) {
    const {info} = this.props;
    const {pageBuilder, element} = info;
    const ElementClass = pageBuilder.elements[element.tag];

    return (
      <div className='element-empty-placeholder'>
        <div className='element-empty-placeholder-wrapper'>
          <i className={ElementClass.settings.icon.class}>
            {ElementClass.settings.icon.content}
          </i>
          <div className=''>
            <div>{`Empty ${element.tag} element`}</div>
            <div>
              <span>Drop elements here or </span>
              <span className='link' onClick={addEvent}>click to add</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderHighlight () {
    const {info} = this.props;
    if (info.elementId) {
      const {pageBuilder, dnd, element} = info;
      const {elements} = pageBuilder;
      const {dragging} = dnd;

      const overed = this.isOvered();
      const selected = this.isSelected();

      if (!dragging && (overed || selected)) {
        const elementType = element.tag;
        const ElementClass = elements[elementType];
        const inside = this.state.offset.top <= 65 || (this.props.style && this.props.style.overflow === 'hidden');
        const subComponent = element.subComponent;

        return (
          <div className={cx('element-highlight', selected && 'selected', inside && 'inside', subComponent && 'sub-component')}>
            <div className='element-identifier'>
              <i className={ElementClass.settings.icon.class}>{ElementClass.settings.icon.content}</i>
              <span>{element.label || elementType}</span>
            </div>
          </div>
        );
      }
    }
  }
}
