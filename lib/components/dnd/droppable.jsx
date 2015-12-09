import cx from 'classnames';
import forEach from 'lodash.foreach';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Component} from 'relax-framework';

import AnimateProps from '../animate-props';
import Marker from './marker';

export default class Droppable extends Component {
  static propTypes = {
    dnd: PropTypes.object.isRequired,
    dndActions: PropTypes.object.isRequired,
    dropInfo: PropTypes.object.isRequired,
    pageBuilder: PropTypes.object,
    pageBuilderActions: PropTypes.object,
    orientation: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    minHeight: PropTypes.number,
    minWidth: PropTypes.number,
    accepts: PropTypes.any,
    rejects: PropTypes.any,
    type: PropTypes.string,
    placeholder: PropTypes.bool,
    placeholderContent: PropTypes.string,
    placeholderOverlap: PropTypes.func,
    hidePlaceholder: PropTypes.bool,
    selectionChildren: PropTypes.string,
    children: PropTypes.node
  }

  static contextTypes = {
    dropBlock: PropTypes.bool
  }

  static childContextTypes = {
    dropHighlight: PropTypes.string.isRequired,
    dropBlock: PropTypes.bool
  }

  static defaultProps = {
    orientation: 'vertical',
    minHeight: 150,
    minWidth: 50,
    placeholder: false
  }

  getInitState () {
    return {
      overed: false,
      closeToMargin: false
    };
  }

  getChildContext () {
    const {dragging} = this.props.dnd;
    const childContext = {
      dropHighlight: 'none'
    };

    if (dragging) {
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

  componentWillReceiveProps (nextProps) {
    const containerRect = findDOMNode(this).getBoundingClientRect();
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

  onMouseEnter (event) {
    if (this.state.entered) {
      return;
    }

    const order = this.props.children && (this.props.children instanceof Array && this.props.children.length > 0);

    this.setState({
      entered: true,
      order: order,
      overed: !order
    });

    if (!order) {
      const {onDroppable} = this.props.dndActions;
      onDroppable(this.props.dropInfo);
    }
  }

  onMouseLeave (event) {
    const {dropInfo} = this.props.dnd;
    const {outDroppable} = this.props.dndActions;

    if (dropInfo && dropInfo.id === this.props.dropInfo.id) {
      outDroppable(this.props.dropInfo.id);
    }

    this.setState({
      entered: false,
      overed: false
    });
  }

  draggingSelf () {
    const {dropInfo, dnd} = this.props;
    const {dragInfo} = dnd;
    return dropInfo.id && dragInfo.id && dropInfo.id === dragInfo.id;
  }

  droppableHere () {
    const {draggingData} = this.props.dnd;
    let is = true;

    const dropBlock = this.context.dropBlock;
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
    const {dragging} = this.props.dnd;
    if (dragging && this.droppableHere()) {
      return {
        onMouseOver: this.onMouseEnter.bind(this),
        onMouseLeave: this.onMouseLeave.bind(this)
      };
    }
  }

  addSpotClick (position, event) {
    event.preventDefault();
    const {openElementsMenu} = this.props.pageBuilderActions;
    openElementsMenu({
      targetId: this.props.dropInfo.id || 'body',
      targetType: this.props.type,
      targetPosition: position,
      container: findDOMNode(this.refs['spot' + position]),
      accepts: this.props.accepts,
      rejects: this.props.rejects
    });
  }

  hasChildren () {
    const children = this.props.children;
    var _hasChildren = false;
    if (children) {
      if (children instanceof Array) {
        _hasChildren = children.length > 0;
      } else if (children instanceof Object) {
        _hasChildren = true;
      }
    }
    return _hasChildren;
  }

  showMarks () {
    let result = false;
    if (this.props.pageBuilder) {
      const {linkingData, selectedParent, selectedId} = this.props.pageBuilder;
      result = !linkingData && (selectedParent === this.props.dropInfo.id || (selectedId === this.props.dropInfo.id));
    }
    return result;
  }

  isActive () {
    const {dragging, dropInfo} = this.props.dnd;
    return dragging && dropInfo.id === this.props.dropInfo.id;
  }

  render () {
    const {dragging, dropInfo} = this.props.dnd;
    let children = this.props.children;
    const hasChildren = this.hasChildren();
    const isActive = dragging && dropInfo.id === this.props.dropInfo.id;

    const style = {
      backgroundColor: isActive && !hasChildren && !this.props.placeholder ? '#33CC33' : 'transparent'
    };
    if (!hasChildren) {
      style.minHeight = this.props.minHeight;
      style.minWidth = this.props.minWidth;
    }
    if (this.props.style) {
      Object.assign(style, this.props.style);
    }

    if (hasChildren && dragging && this.droppableHere()) {
      children = this.renderDropMarkers(children);
    } else if (hasChildren && !dragging && this.showMarks()) {
      children = this.renderAddMarkers(children);
    }

    return (
      <div className={cx('droppable', this.props.className)} draggable='false' style={style} {...this.getEvents()}>
        {hasChildren ? children : this.renderPlaceholder()}
      </div>
    );
  }

  renderDropMarkers (children) {
    const thisDropInfo = this.props.dropInfo;
    const {dnd} = this.props;
    const {dropInfo, dragInfo} = dnd;
    const isActive = this.isActive();

    const isDraggingParent = dragInfo.parentId === thisDropInfo.id;

    const tempChildren = [];

    if (!isDraggingParent || dragInfo.positionInParent !== 0) {
      tempChildren.push(
        <Marker
          key='marker'
          dnd={this.props.dnd}
          dndActions={this.props.dndActions}
          orientation={this.props.orientation}
          active={isActive && dropInfo.position === 0}
          report={{...this.props.dropInfo, position: 0}}
        />
      );
    }

    forEach(children, (child, index) => {
      tempChildren.push(child);

      if (!isDraggingParent || dragInfo.positionInParent !== index && dragInfo.positionInParent !== index + 1) {
        tempChildren.push((
          <Marker
            key={'marker' + index}
            dnd={this.props.dnd}
            dndActions={this.props.dndActions}
            orientation={this.props.orientation}
            active={isActive && dropInfo.position === index + 1}
            report={{...this.props.dropInfo, position: index + 1}}
          />
        ));
      }
    });

    return tempChildren;
  }

  renderAddMarkers (children) {
    const tempChildren = [
      this.renderMark(0)
    ];

    forEach(children, (child, index) => {
      tempChildren.push(child);
      tempChildren.push(this.renderMark(index + 1));
    });

    return tempChildren;
  }

  renderMark (position) {
    const {elementsMenuSpot, selectedId} = this.props.pageBuilder;
    const vertical = this.props.orientation && this.props.orientation === 'horizontal';
    const active = elementsMenuSpot === position && selectedId === this.props.dropInfo.id;

    return (
      <div key={'mark' + position} className={cx('add-marker', vertical && 'vertical', !vertical && this.state.closeToMargin && 'inverted', active && 'active')} onClick={this.addSpotClick.bind(this, position)}>
        <span className='marker' ref={'spot' + position}>
          <span className='triangle'></span>
          <span className='circle'>
            <i className='material-icons'>add</i>
          </span>
        </span>
      </div>
    );
  }

  renderPlaceholder () {
    if (this.props.placeholder && (!this.props.hidePlaceholder || this.props.hidePlaceholder && this.droppableHere())) {
      let result;
      if (this.props.placeholderOverlap) {
        result = this.props.placeholderOverlap(this.renderMark.bind(this, 0), this.addSpotClick.bind(this, 0));
      } else {
        result = (
          <div className={cx('drop-placeholder', this.state.overed && 'active')}>
            {this.renderPlaceholderContent()}
          </div>
        );
      }
      return result;
    }
  }

  renderPlaceholderContent () {
    let result;
    if (this.isActive()) {
      const props = {
        scaleX: '150%',
        scaleY: '150%'
      };
      const options = {
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
}
