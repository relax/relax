import React from 'react';
import {Component} from 'relax-framework';
import forEach from 'lodash.foreach';
import merge from 'lodash.merge';
import Utils from '../utils';
import AnimateProps from './animateProps';
import Velocity from 'velocity-animate';
import cx from 'classnames';

var LEFT_BUTTON = 0;
var draggingData = {};
var dragReport = {
  dropInfo: false
};
var droppableOrientation = 'vertical';

export class Draggable extends Component {
  getInitialState () {
    this.onMouseUpListener = this.onMouseUp.bind(this);
    this.onMouseMoveListener = this.onMouseMove.bind(this);

    return {
      dragging: false
    };
  }

  onMouseUp () {
    document.removeEventListener('mouseup', this.onMouseUpListener);
    document.removeEventListener('mousemove', this.onMouseMoveListener);
  }

  onMouseMove (event) {
    event.preventDefault();

    this.onMouseUp();

    var element = React.findDOMNode(this);

    var elementOffset = Utils.getOffsetRect(element);
    var width = elementOffset.width;

    // Change state
    this.setState({
      dragging: true
    });

    // Dragging data
    draggingData = {
      children: this.props.children,
      elementOffset: elementOffset,
      elementWidth: width,
      mouseX: event.pageX,
      mouseY: event.pageY,
      type: this.props.type
    };

    dragReport.dragInfo = this.props.dragInfo;

    if (this.props.droppableOn) {
      draggingData.droppableOn = this.props.droppableOn;
    }

    // Parent events
    if (this.props && this.props.onStartDrag) {
      this.props.onStartDrag();
    } else if (this.context && this.context.onStartDrag) {
      this.context.onStartDrag();
    } else {
      console.log("onStartDrag callback was no set on draggable object");
    }

  }

  onMouseDown (event) {
    if (event.button === LEFT_BUTTON) {
      let draggable = !(this.props.dragSelected === false && this.context.selected.id === this.props.dragInfo.id);
      event.stopPropagation();

      if (draggable) {
        document.addEventListener('mouseup', this.onMouseUpListener);
        document.addEventListener('mousemove', this.onMouseMoveListener);
      }
    }
  }

  render () {
    var props = {
      className: (this.props.children.props.className || '')+' draggable',
      draggable: 'false',
      onMouseDown: this.onMouseDown.bind(this)
    };

    if (this.props.onClick) {
      props.onClick = this.props.onClick;
    }

    return React.cloneElement(this.props.children, props);
  }
}

Draggable.contextTypes = {
  selected: React.PropTypes.any,
  onStartDrag: React.PropTypes.func
};

Draggable.propTypes = {
  type: React.PropTypes.string.isRequired,
  dragInfo: React.PropTypes.object.isRequired,
  droppableOn: React.PropTypes.string,
  onStartDrag: React.PropTypes.func,
  onClick: React.PropTypes.func
};

class Marker extends Component {
  animateIn () {
    var animateObj = {};

    if (droppableOrientation === 'vertical') {
      animateObj.height = '7px';
    } else {
      animateObj.width = '7px';
    }

    Velocity(React.findDOMNode(this), animateObj, { duration: 400, easing: "easeOutExpo" });
  }

  componentDidMount () {
    super.componentDidMount();
    this.animateInterval = setTimeout(this.animateIn.bind(this), 50);
  }

  componentWillUnmount () {
    super.componentWillUnmount();
    clearTimeout(this.animateInterval);
  }

  render () {
    var style = {
      height: droppableOrientation === 'vertical' ? 0 : 'auto',
      width: droppableOrientation === 'vertical' ? '100%' : 0,
      backgroundColor: '#33CC33',
      opacity: '0.8'
    };

    if (droppableOrientation === 'horizontal') {
      style.display = 'table-cell';
    }

    return (
      <div style={style}></div>
    );
  }
}


export class Dragger extends Component {
  getInitialState () {
    return {
      top: draggingData.elementOffset.top + (this.props.offset && this.props.offset.top ? this.props.offset.top : 0),
      left: draggingData.elementOffset.left + (this.props.offset && this.props.offset.left ? this.props.offset.left : 0)
    };
  }

  componentDidMount () {
    super.componentDidMount();

    this.onMouseUpListener = this.onMouseUp.bind(this);
    this.onMouseMoveListener = this.onMouseMove.bind(this);

    let node = React.findDOMNode(this);

    let relativeX = draggingData.mouseX - draggingData.elementOffset.left;
    let relativeY = draggingData.mouseY - draggingData.elementOffset.top;
    node.style.transformOrigin = relativeX+'px '+relativeY+'px';

    Velocity(React.findDOMNode(this), {
      scaleX: '0.5',
      scaleY: '0.5',
      opacity: '0.7'
    }, { duration: 500, easing: "easeOutExpo" });

    document.addEventListener('mouseup', this.onMouseUpListener);
    document.addEventListener('mousemove', this.onMouseMoveListener);
  }

  onMouseUp (event) {
    document.removeEventListener('mouseup', this.onMouseUpListener);
    document.removeEventListener('mousemove', this.onMouseMoveListener);

    // Parent events
    if (this.props.onStopDrag) {
      this.props.onStopDrag();
    }
    else {
      console.log("onStopDrag callback was no set on dragger object");
    }
  }

  onMouseMove (event) {
    event.preventDefault();

    var deltaX = event.pageX - draggingData.mouseX + draggingData.elementOffset.left;
    var deltaY = event.pageY - draggingData.mouseY + draggingData.elementOffset.top;

    this.setState({
      top: deltaY + (this.props.offset && this.props.offset.top ? this.props.offset.top : 0),
      left: deltaX + (this.props.offset && this.props.offset.left ? this.props.offset.left : 0)
    });
  }

  render () {
    var style = {
      position: 'fixed',
      width: draggingData.elementWidth+'px',
      top: this.state.top+'px',
      left: this.state.left+'px',
      pointerEvents: 'none',
      boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.5)',
      zIndex: 20
    };

    return (
      <div className='dragger' draggable='false' style={style}>
        {draggingData.children}
      </div>
    );
  }
}


export class Droppable extends Component {

  getInitialState () {
    this.onMouseMoveListener = this.onMouseMove.bind(this);
    this.onMouseUpListener = this.onMouseUp.bind(this);

    return {
      overed: false,
      closeToMargin: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.dragging) {
      this.removeOrderingEvents();

      this.setState({
        entered: false,
        overed: false
      });
    }
  }

  componentDidMount () {
    super.componentDidMount();
    const containerRect = React.findDOMNode(this).getBoundingClientRect();

    if (containerRect.left < 40) {
      if (!this.state.closeToMargin) {
        this.setState({
          closeToMargin: true
        });
      }
    } else if (this.state.closeToMargin) {
      this.setState({
        closeToMargin: false
      });
    }
  }

  getChildContext () {
    var childContext = {
      dropHighlight: 'none'
    };

    if (this.context.dragging) {
      if (this.droppableHere()) {
        if (this.props.orientation && this.props.orientation === 'horizontal') {
          childContext.dropHighlight = 'horizontal';
        } else {
          childContext.dropHighlight = 'vertical';
        }
      } else if (this.draggingSelf()) {
        childContext.dropBlock = true;
      }
    }

    return childContext;
  }

  onMouseEnter (event) {
    if (this.state.entered) {
      return;
    }

    // Ordering
    var order = false;
    if (this.props.children && (this.props.children instanceof Array && this.props.children.length > 0)) {
      var elements = React.findDOMNode(this).children;

      if (elements.length > 0) {

        // store children positions
        this.childrenData = [];
        var domPosition = 0;
        forEach(elements, (child) => {
          if (this.props.selectionChildren && child.className.indexOf(this.props.selectionChildren) === -1) {
            domPosition ++;
            return true;
          }
          order = true;

          let position = Utils.getOffsetRect(child);
          let width = position.width;
          let height = position.height;

          this.childrenData.push({position, width, height, domPosition});

          domPosition ++;
        });
      }
    }

    this.setState({
      entered: true,
      order: order,
      overed: !order
    });

    if (order) {
      this.addOrderingEvents();
      this.onMouseMove(event);
    } else {
      dragReport.dropInfo = this.props.dropInfo;
    }
  }

  onMouseLeave (event) {
    this.removeOrderingEvents();

    if (dragReport.dropInfo && dragReport.dropInfo.id === this.props.dropInfo.id) {
      dragReport.dropInfo = false;
    }

    this.setState({
      entered: false,
      overed: false
    });
  }

  onMouseMove (event) {
    var position = -1;
    const hitSpace = this.props.hitSpace;

    var mousePosition = this.props.orientation === 'horizontal' ? event.pageX : event.pageY;

    forEach(this.childrenData, (child, index) => {

      if (index === 0) {
        let firstPosition = this.props.orientation === 'horizontal' ? child.position.left : child.position.top;
        let secondPosition = this.props.orientation === 'horizontal' ? child.position.left+hitSpace : child.position.top+hitSpace;

        if (mousePosition > firstPosition && mousePosition < secondPosition) {
          position = index;
          this.draggerPosition = child.domPosition;
          return false;
        }
      }

      var firstPosition, secondPosition;
      if (index === this.childrenData.length - 1) {
        firstPosition = this.props.orientation === 'horizontal' ? child.position.left+child.width-hitSpace : child.position.top+child.height-hitSpace;
        secondPosition = this.props.orientation === 'horizontal' ? child.position.left+child.width : child.position.top+child.height;
      } else {
        firstPosition = this.props.orientation === 'horizontal' ? child.position.left+child.width-hitSpace/2 : child.position.top+child.height-hitSpace/2;
        secondPosition = this.props.orientation === 'horizontal' ? child.position.left+child.width+hitSpace/2 : child.position.top+child.height+hitSpace/2;
      }

      if (mousePosition > firstPosition && mousePosition < secondPosition) {
        position = index+1;
        this.draggerPosition = child.domPosition + 1;
        return false;
      }
    });

    if (position !== -1 && !this.state.overed) {
      if (dragReport.dropInfo === false) {
        this.setState({
          overed: true,
          position
        });
        this.props.dropInfo.position = position;
        dragReport.dropInfo = this.props.dropInfo;
        droppableOrientation = this.props.orientation;

        event.stopPropagation();
      }
    }
    if (position === -1 && this.state.overed) {
      this.setState({
        overed: false,
        position: false
      });

      if (dragReport.dropInfo && dragReport.dropInfo.id === this.props.dropInfo.id) {
        dragReport.dropInfo = false;
      }
    }
  }

  onMouseUp (event) {

  }

  addOrderingEvents () {
    document.addEventListener('mousemove', this.onMouseMoveListener);
    document.addEventListener('mouseup', this.onMouseUpListener);
  }

  removeOrderingEvents () {
    document.removeEventListener('mousemove', this.onMouseMoveListener);
    document.removeEventListener('mouseup', this.onMouseUpListener);
  }

  draggingSelf () {
    return this.props.dropInfo.id && dragReport.dragInfo.id && this.props.dropInfo.id === dragReport.dragInfo.id;
  }

  droppableHere () {
    var is = true;

    var dropBlock = this._reactInternalInstance._context && this._reactInternalInstance._context.dropBlock; // # TODO modify when react passes context from owner-based to parent-based (0.14?)
    if (this.draggingSelf() || dropBlock) {
      return false;
    }

    // Droppable restrictions
    if (this.props.accepts) {
      if (this.props.accepts !== 'any' && this.props.accepts !== draggingData.type) {
        is = false;
      }
    } else if (this.props.rejects) {
      if (this.props.rejects === 'any' || this.props.rejects === draggingData.type) {
        is = false;
      }
    }

    // Dragging restrictions
    if (is && draggingData.droppableOn) {
      if (draggingData.droppableOn !== 'any' && this.props.type !== draggingData.droppableOn) {
        is = false;
      }
    }

    return is;
  }

  getEvents () {
    if (this.context.dragging && this.droppableHere()) {
      return {
        onMouseOver: this.onMouseEnter.bind(this),
        onMouseLeave: this.onMouseLeave.bind(this)
      };
    }
  }

  addSpotClick (position, event) {
    event.preventDefault();
    this.context.openElementsMenu({
      targetId: this.props.dropInfo.id || 'body',
      targetType: this.props.type,
      targetPosition: position,
      container: React.findDOMNode(this.refs['spot'+position]),
      accepts: this.props.accepts,
      rejects: this.props.rejects
    });
  }

  renderPlaceholderContent () {
    let result;
    if (this.state.overed) {
      let props = {
        scaleX: '150%',
        scaleY: '150%'
      };
      let options = {
        duration: 600,
        loop: true
      };
      result = (
        <AnimateProps props={props} options={options}>
          <i className='material-icons'>add_circle</i>
        </AnimateProps>
      );
    } else {
      if (this.props.placeholderContent) {
        result = <div>{this.props.placeholderContent}</div>;
      } else {
        result = (
          <div>
            <span>Drop elements here or </span>
            <span className='link' onClick={this.addSpotClick.bind(this, 0)} ref='spot0'>
              <span>click to add</span>
            </span>
          </div>
        );
      }
    }

    return result;
  }

  renderPlaceholder () {
    if (this.props.placeholder) {
      return (
        <div className={cx('drop-placeholder', this.state.overed && 'active')}>
          {this.renderPlaceholderContent()}
        </div>
      );
    }
  }

  renderMark (position) {
    let vertical = this.props.orientation && this.props.orientation === 'horizontal';
    let active = this.context.elementsMenuSpot === position && this.context.selected && this.context.selected.id === this.props.dropInfo.id;

    return (
      <div className={cx('add-marker', vertical && 'vertical', !vertical && this.state.closeToMargin && 'inverted', active && 'active')} onClick={this.addSpotClick.bind(this, position)}>
        <span className='marker' ref={'spot'+position}>
          <span className='triangle'></span>
          <span className='circle'>
            <i className='material-icons'>add</i>
          </span>
        </span>
      </div>
    );
  }

  render () {
    var children = this.props.children;
    var hasChildren = children && (children instanceof Array && children.length > 0);

    var style = {
      backgroundColor: this.state.overed && !this.state.order && !this.props.placeholder ? '#33CC33' : 'transparent',
      minHeight: hasChildren ? 0 : this.props.minHeight,
      minWidth: hasChildren ? 0 : this.props.minWidth,
      position: this.context.dragging && 'relative'
    };
    if (this.props.style) {
      merge(style, this.props.style);
    }

    if (this.state.overed && this.state.order && this.state.position !== false) {
      children = hasChildren ? children.slice(0) : [this.props.children];

      let marker = (
        <Marker key='marker' />
      );

      children.splice(this.draggerPosition, 0, marker);
    } else if (hasChildren && (this.context.selectedParent === this.props.dropInfo.id || (this.context.selected && this.context.selected.id === this.props.dropInfo.id)) && !this.context.dragging) {
      var tempChildren = [
        this.renderMark(0)
      ];

      forEach(children, (child, index) => {
        tempChildren.push(child);
        tempChildren.push(this.renderMark(index+1));
      });

      children = tempChildren;
    }

    return (
      <div className={cx('droppable', this.props.className)} draggable='false' style={style} {...this.getEvents()}>
        {hasChildren ? children : this.renderPlaceholder()}
      </div>
    );
  }
}

Droppable.propTypes = {
  orientation: React.PropTypes.string,
  dropInfo: React.PropTypes.object.isRequired,
  hitSpace: React.PropTypes.number.isRequired,
  style: React.PropTypes.object,
  minHeight: React.PropTypes.number,
  accepts: React.PropTypes.any,
  rejects: React.PropTypes.any,
  type: React.PropTypes.string,
  placeholder: React.PropTypes.bool,
  placeholderContent: React.PropTypes.string
};

Droppable.defaultProps = {
  orientation: 'vertical',
  minHeight: 150,
  minWidth: 50,
  hitSpace: 18,
  placeholder: false
};

Droppable.contextTypes = {
  dragging: React.PropTypes.bool.isRequired,
  dropBlock: React.PropTypes.bool,
  selected: React.PropTypes.any,
  selectedParent: React.PropTypes.number,
  openElementsMenu: React.PropTypes.func,
  elementsMenuSpot: React.PropTypes.number
};

Droppable.childContextTypes = {
  dropHighlight: React.PropTypes.string.isRequired,
  dropBlock: React.PropTypes.bool
};


export class DragRoot extends Component {
  constructor (props, children) {
    super(props, children);
  }

  onStartDrag () {
    this.setState({
      dragging: true
    });
  }

  onStopDragEvent () {
    this.setState({
      dragging: false
    });

    if (this.draggedComponent) {
      this.draggedComponent(dragReport);
      dragReport.dropInfo = false;
    } else {
      console.log('draggedComponent not implemented on drag root extended component');
    }
  }

  renderDragger (offset = {}) {
    if (this.state && this.state.dragging) {
      return (
        <Dragger onStopDrag={this.onStopDragEvent.bind(this)} />
      );
    }
  }
}
