import React from 'react';
import {Component} from 'relax-framework';
import forEach from 'lodash.foreach';
import merge from 'lodash.merge';
import {Droppable, Draggable} from './drag';
import Utils from '../utils';
import Velocity from 'velocity-animate';
import cx from 'classnames';

export default class Element extends Component {
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

  componentWillReceiveProps (nextProps) {
    if (this.context.editing && this.state.animation !== (this.props.element.animation && this.props.element.animation.use)) {
      this.setState({
        animation: this.props.element.animation && this.props.element.animation.use
      });
    }
  }

  componentDidMount () {
    this.state.offset = this.getOffset();

    if ((!this.context.editing && this.state.animation) || this.props.onEnterScreen) {
      this.onScrollBind = this.onScroll.bind(this);
      window.addEventListener('scroll', this.onScrollBind);
      this.onScroll();
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
    var dom = React.findDOMNode(this);
    var animation = this.props.element.animation;
    this.state.animated = true;
    this.state.animatedEditing = false;
    Velocity(dom, animation.effect, {
       duration: animation.duration,
       display: null
    });
  }

  animationInit () {
    if (this.state.animation) {
      var animation = this.props.element.animation;
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
    var dom = React.findDOMNode(this);
    var rect = dom.getBoundingClientRect();

    if ( (rect.top <= 0 && rect.bottom >= 0) || (rect.top > 0 && rect.top < window.outerHeight) ) {
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
    event.stopPropagation();
    this.context.selectElement(this.props.element.id);
  }

  getOffset () {
    var dom = React.findDOMNode(this);
    return Utils.getOffsetRect(dom);
  }

  onMouseOver (event) {
    if (!this.context.dragging) {
      event.stopPropagation();
      clearTimeout(this.outTimeout);
      if (!this.isOvered() && !this.isSelected()) {
        var offset = this.getOffset();
        this.context.overElement(this.props.element.id);
        this.state.offset = offset;
      }
    }
  }

  onMouseOut () {
    if (!this.context.dragging && this.isOvered()) {
      this.outTimeout = setTimeout(this.selectOut.bind(this), 50);
    }
  }

  selectOut () {
    this.context.outElement(this.props.element.id);
  }

  isOvered () {
    return (this.context.overedElement && this.props.element.id === this.context.overedElement.id);
  }

  isSelected () {
    return (this.context.selected && this.props.element.id === this.context.selected.id);
  }

  renderContent () {
    if (this.props.settings.drop && !this.props.settings.drop.customDropArea && this.context.editing) {
      var dropInfo = {
        id: this.props.element.id
      };

      return (
        <Droppable type={this.props.element.tag} dropInfo={dropInfo} {...this.props.settings.drop} placeholder={true}>
          {this.props.children}
        </Droppable>
      );
    } else {
      return this.props.children;
    }
  }

  renderHighlight () {
    if (typeof this.props.element.id !== 'string') {
      var className;
      var dropHighlight = this._reactInternalInstance._context.dropHighlight; // # TODO modify when react passes context from owner-based to parent-based (0.14?)

      const overed = this.isOvered();
      const selected = this.isSelected();

      if (!this.context.dragging && (overed || selected)) {
        var elementType = this.props.element.tag;
        var element = this.context.elements[elementType];
        let inside = this.state.offset.top <= 65 || (this.props.style && this.props.style.overflow === 'hidden');
        let subComponent = this.props.element.subComponent;

        return (
          <div className={cx('element-highlight', selected && 'selected', inside && 'inside', subComponent && 'sub-component')}>
            <div className='element-identifier'>
              <i className={element.settings.icon.class}>{element.settings.icon.content}</i>
              <span>{this.props.element.label || elementType}</span>
            </div>
          </div>
        );
      } else if (dropHighlight !== 'none') {
        className = 'element-drop-highlight '+dropHighlight;
        return (
          <div className={className}></div>
        );
      }
    }
  }

  render () {
    var props = {};
    forEach(this.props, (prop, key) => {
      if (key !== 'tag' && key !== 'children' && key !== 'settings' && key !== 'element' && key !== 'onEnterScreen') {
        props[key] = prop;
      }
    });

    if (this.context.editing && this.props.settings.drag) {
      const overed = this.isOvered();
      const selected = this.isSelected();

      if ((!this.context.dragging && (overed || selected)) || this.context.dragging || this.context.selectedParent === this.props.element.id) {
        props.style = props.style || {};
        props.style.position = props.style.position || 'relative';
      }

      if (this.state.animatedEditing && this.state.animation && !this.state.animated) {
        props.style = props.style || {};
        props.style.opacity = 0;
      }

      if (this.props.element.subComponent) {
        return (
          <this.props.tag {...props} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)} onClick={this.onElementClick.bind(this)}>
            {this.renderContent()}
            {this.renderHighlight()}
          </this.props.tag>
        );
      } else {
        var draggableProps = merge({
          dragInfo: {
            type: 'move',
            id: this.props.element.id
          },
          onClick: this.onElementClick.bind(this),
          type: this.props.element.tag
        }, this.props.settings.drag);

        return (
          <Draggable {...draggableProps}>
            <this.props.tag {...props} onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOut.bind(this)}>
              {this.renderContent()}
              {this.renderHighlight()}
            </this.props.tag>
          </Draggable>
        );
      }
    } else {
      if (this.state.animation && !this.state.animated) {
        props.style = props.style || {};
        props.style.opacity = 0;
      }

      return (
        <this.props.tag {...props}>
          {this.renderContent()}
        </this.props.tag>
      );
    }
  }
}

Element.propTypes = {
  tag: React.PropTypes.string.isRequired,
  element: React.PropTypes.object.isRequired,
  settings: React.PropTypes.object.isRequired,
  onEnterScreen: React.PropTypes.func
};

Element.contextTypes = {
  selected: React.PropTypes.any,
  selectElement: React.PropTypes.func,
  dragging: React.PropTypes.bool,
  elements: React.PropTypes.object,
  overElement: React.PropTypes.func,
  outElement: React.PropTypes.func,
  overedElement: React.PropTypes.any,
  editing: React.PropTypes.bool.isRequired,
  dropHighlight: React.PropTypes.string,
  selectedParent: React.PropTypes.string
};
