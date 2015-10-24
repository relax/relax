import cx from 'classnames';
import Velocity from 'velocity-animate';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Utils from '../utils';
import {Droppable, Draggable} from './dnd';

export default class Element extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    dnd: PropTypes.object,
    dndActions: PropTypes.object,
    tag: React.PropTypes.string.isRequired,
    element: React.PropTypes.object.isRequired,
    elementId: React.PropTypes.string.isRequired,
    settings: React.PropTypes.object.isRequired,
    onEnterScreen: React.PropTypes.func,
    pageBuilder: React.PropTypes.object,
    pageBuilderActions: React.PropTypes.object
  }

  getInitialState () {
    if (this.context.editing && this.isClient()) {
      this.animationEditingBind = this.animationEditing.bind(this);
      window.addEventListener('animateElements', this.animationEditingBind);
    }

    return {
      offset: {top: 0},
      animation: this.props.element.animation && this.props.element.animation.use,
      animated: false,
      animatedEditing: false
    };
  }

  componentDidMount () {
    const {editing} = this.props.pageBuilder;
    this.state.offset = this.getOffset();

    if ((!editing && this.state.animation) || this.props.onEnterScreen) {
      this.onScrollBind = this.onScroll.bind(this);
      window.addEventListener('scroll', this.onScrollBind);
      this.onScroll();
    }
  }

  componentWillReceiveProps (nextProps) {
    const {editing} = nextProps.pageBuilder;
    if (editing && this.state.animation !== (this.props.element.animation && this.props.element.animation.use)) {
      this.setState({
        animation: this.props.element.animation && this.props.element.animation.use
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
    const dom = React.findDOMNode(this);
    const animation = this.props.element.animation;
    this.state.animated = true;
    this.state.animatedEditing = false;
    Velocity(dom, animation.effect, {
      duration: animation.duration,
      display: null
    });
  }

  animationInit () {
    if (this.state.animation) {
      const animation = this.props.element.animation;
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
    const dom = React.findDOMNode(this);
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
    const {selectElement} = this.props.pageBuilderActions;
    event.stopPropagation();
    selectElement(this.props.elementId);
  }

  getOffset () {
    const dom = React.findDOMNode(this);
    return Utils.getOffsetRect(dom);
  }

  onMouseOver (event) {
    const {dragging} = this.props.dnd;
    const {overElement} = this.props.pageBuilderActions;
    if (!dragging) {
      event.stopPropagation();
      clearTimeout(this.outTimeout);
      if (!this.isOvered() && !this.isSelected()) {
        const offset = this.getOffset();
        overElement(this.props.elementId);
        this.state.offset = offset;
      }
    }
  }

  onMouseOut () {
    const {dragging} = this.props.dnd;
    if (!dragging && this.isOvered()) {
      this.outTimeout = setTimeout(this.selectOut.bind(this), 50);
    }
  }

  selectOut () {
    const {outElement} = this.props.pageBuilderActions;
    outElement(this.props.elementId);
  }

  isOvered () {
    const {overedId} = this.props.pageBuilder;
    return (overedId && this.props.elementId === overedId);
  }

  isSelected () {
    const {selectedId} = this.props.pageBuilder;
    return (selectedId && this.props.elementId === selectedId);
  }

  render () {
    let result;
    const {children, settings, element, elementId, onEnterScreen, ...props} = this.props;
    const {editing, selectedParent} = this.props.pageBuilder;

    if (editing && this.props.settings.drag) {
      const overed = this.isOvered();
      const selected = this.isSelected();
      const {dragging} = this.props.dnd;

      if ((!dragging && (overed || selected)) || dragging || selectedParent === elementId) {
        props.style = props.style || {};
        props.style.position = props.style.position || 'relative';
      }

      if (this.state.animatedEditing && this.state.animation && !this.state.animated) {
        props.style = props.style || {};
        props.style.opacity = 0;
      }

      if (element.subComponent) {
        result = (
          <element.tag {...props} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)} onClick={this.onElementClick.bind(this)}>
            {this.renderContent()}
            {this.renderHighlight()}
          </element.tag>
        );
      } else {
        const draggableProps = Object.assign({
          dragInfo: {
            type: 'move',
            id: this.props.elementId
          },
          onClick: this.onElementClick.bind(this),
          type: this.props.element.tag
        }, this.props.settings.drag);

        result = (
          <Draggable {...draggableProps} dnd={this.props.dnd} dndActions={this.props.dndActions}>
            <element.tag {...props} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)}>
              {this.renderContent()}
              {this.renderHighlight()}
            </element.tag>
          </Draggable>
        );
      }
    } else {
      if (this.state.animation && !this.state.animated) {
        props.style = props.style || {};
        props.style.opacity = 0;
      }

      result = (
        <element.tag {...props}>
          {this.renderContent()}
        </element.tag>
      );
    }
    return result;
  }

  renderContent () {
    const {editing} = this.props.pageBuilder;
    let result;
    if (this.props.settings.drop && !this.props.settings.drop.customDropArea && editing) {
      const dropInfo = {
        id: this.props.elementId
      };

      result = (
        <Droppable
          type={this.props.element.tag}
          dropInfo={dropInfo}
          {...this.props.settings.drop}
          placeholder
          dnd={this.props.dnd}
          dndActions={this.props.dndActions}>
          {this.props.children}
        </Droppable>
      );
    } else {
      result = this.props.children;
    }
    return result;
  }

  renderHighlight () {
    if (this.props.elementId) {
      const {elements} = this.props.pageBuilder;
      const {dragging} = this.props.dnd;
      const dropHighlight = this._reactInternalInstance._context.dropHighlight; // # TODO modify when react passes context from owner-based to parent-based (0.14?)
      let className;

      const overed = this.isOvered();
      const selected = this.isSelected();

      if (!dragging && (overed || selected)) {
        const elementType = this.props.element.tag;
        const element = elements[elementType];
        const inside = this.state.offset.top <= 65 || (this.props.style && this.props.style.overflow === 'hidden');
        const subComponent = this.props.element.subComponent;

        return (
          <div className={cx('element-highlight', selected && 'selected', inside && 'inside', subComponent && 'sub-component')}>
            <div className='element-identifier'>
              <i className={element.settings.icon.class}>{element.settings.icon.content}</i>
              <span>{this.props.element.label || elementType}</span>
            </div>
          </div>
        );
      } else if (dropHighlight !== 'none') {
        className = 'element-drop-highlight ' + dropHighlight;
        return (
          <div className={className}></div>
        );
      }
    }
  }
}
