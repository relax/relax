import bind from 'decorators/bind';
import cx from 'classnames';
import forEach from 'lodash.foreach';
import AnimateProps from 'components/animate-props';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import styles from './droppable.less';
import AddBallon from './add-ballon';
import Marker from './marker';

export default class Droppable extends Component {
  static propTypes = {
    dndActions: PropTypes.object.isRequired,
    dragging: PropTypes.bool.isRequired,
    activeDropInfo: PropTypes.any.isRequired,
    activeDragInfo: PropTypes.any.isRequired,
    dropInfo: PropTypes.object.isRequired,
    minHeight: PropTypes.number.isRequired,
    minWidth: PropTypes.number.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    draggingData: PropTypes.object.isRequired,
    accepts: PropTypes.any,
    rejects: PropTypes.any,
    type: PropTypes.string,
    showMarks: PropTypes.bool.isRequired,
    isActive: PropTypes.bool.isRequired,
    orientation: PropTypes.string.isRequired,
    elementsMenuSpot: PropTypes.string,
    selectedId: PropTypes.string,
    openElementsMenu: PropTypes.func.isRequired,
    placeholder: PropTypes.bool,
    hidePlaceholder: PropTypes.bool,
    Placeholder: PropTypes.object,
    placeholderRender: PropTypes.func
  };

  static contextTypes = {
    dropBlock: PropTypes.bool
  };

  static childContextTypes = {
    dropHighlight: PropTypes.string.isRequired,
    dropBlock: PropTypes.bool
  };

  static defaultProps = {
    orientation: 'vertical',
    minHeight: 150,
    minWidth: 50
  };

  getInitState () {
    return {
      closeToMargin: false
    };
  }

  getChildContext () {
    const {dragging} = this.props;
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

  componentWillReceiveProps () {
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

  @bind
  onMouseEnter () {
    if (!this.props.isActive) {
      const order = this.hasChildren();

      this.setState({
        order
      });

      if (!order) {
        const {onDroppable} = this.props.dndActions;
        onDroppable(this.props.dropInfo);
      }
    }
  }

  @bind
  onMouseLeave () {
    if (this.props.isActive) {
      const {dropInfo} = this.props;
      const {outDroppable} = this.props.dndActions;

      outDroppable(dropInfo.id);
    }
  }

  hasChildren () {
    const children = this.props.children;
    let _hasChildren = false;
    if (children) {
      if (children instanceof Array) {
        _hasChildren = children.length > 0;
      } else if (children instanceof Object) {
        _hasChildren = true;
      }
    }
    return _hasChildren;
  }

  draggingSelf () {
    const {dropInfo, activeDragInfo} = this.props;
    return dropInfo.id && activeDragInfo.id && dropInfo.id === activeDragInfo.id;
  }

  droppableHere () {
    const {draggingData, accepts, rejects, type} = this.props;
    let is = true;

    const dropBlock = this.context.dropBlock;
    if (this.draggingSelf() || dropBlock) {
      return false;
    }

    // Droppable restrictions
    if (accepts) {
      if (accepts !== 'any' && accepts !== draggingData.type) {
        is = false;
      }
    } else if (rejects) {
      if (rejects === 'any' || rejects === draggingData.type) {
        is = false;
      }
    }

    // Dragging restrictions
    if (is && draggingData.droppableOn) {
      if (draggingData.droppableOn !== 'any' && type !== draggingData.droppableOn) {
        is = false;
      }
    }

    return is;
  }

  getEvents (droppableHere) {
    const {dragging} = this.props;
    if (dragging && droppableHere) {
      return {
        onMouseOver: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave
      };
    }
  }

  addSpotClick (position, dom) {
    this.props.openElementsMenu({
      targetId: this.props.dropInfo.id || 'body',
      targetType: this.props.type,
      targetPosition: position,
      container: dom || this.refs.spot0,
      accepts: this.props.accepts,
      rejects: this.props.rejects
    });
  }

  render () {
    const {dragging, minHeight, minWidth, className, style, showMarks, isActive, hidePlaceholder} = this.props;
    const droppableHere = this.droppableHere();

    let children = this.props.children;
    const hasChildren = this.hasChildren();

    // style
    const inlineStyle = Object.assign({}, style || {});
    if (!hasChildren && (!hidePlaceholder || hidePlaceholder && this.droppableHere())) {
      inlineStyle.minHeight = minHeight;
      inlineStyle.minWidth = minWidth;
    }

    // children
    if (hasChildren && dragging && droppableHere) {
      children = this.renderDropMarkers(children);
    } else if (hasChildren && !dragging && showMarks) {
      children = this.renderAddMarkers(children);
    }

    return (
      <div
        className={cx(styles.droppable, className, isActive && styles.active)}
        draggable='false'
        style={inlineStyle}
        {...this.getEvents(droppableHere)}
      >
        {hasChildren ? children : this.renderPlaceholder()}
      </div>
    );
  }

  renderDropMarkers (children) {
    const {isActive, activeDropInfo, dropInfo, activeDragInfo, orientation, dndActions} = this.props;
    const isDraggingParent = activeDragInfo.parentId === dropInfo.id;

    const tempChildren = [];

    if (!isDraggingParent || activeDragInfo.positionInParent !== 0) {
      tempChildren.push(
        <Marker
          key='marker'
          dndActions={dndActions}
          orientation={orientation}
          active={isActive && activeDropInfo.position === 0}
          report={{...this.props.dropInfo, position: 0}}
        />
      );
    }

    forEach(children, (child, index) => {
      tempChildren.push(child);

      if (!isDraggingParent ||
          activeDragInfo.positionInParent !== index &&
          activeDragInfo.positionInParent !== index + 1) {
        tempChildren.push((
          <Marker
            key={`marker${index}`}
            dndActions={dndActions}
            orientation={orientation}
            active={isActive && activeDropInfo.position === index + 1}
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
    const {elementsMenuSpot, selectedId, orientation, dropInfo} = this.props;
    const vertical = orientation === 'horizontal';
    const active = elementsMenuSpot === position && selectedId === dropInfo.id;

    return (
      <AddBallon
        key={`mark${position}`}
        position={position}
        onClick={::this.addSpotClick}
        vertical={vertical}
        active={active}
        ref={`spot${position}`}
      />
    );
  }

  renderPlaceholder () {
    const {placeholder, hidePlaceholder, Placeholder, isActive, placeholderRender} = this.props;
    if (placeholder && (!hidePlaceholder || hidePlaceholder && this.droppableHere())) {
      let result;
      const customProps = {
        spotClick: ::this.addSpotClick,
        isActive
      };

      if (Placeholder) {
        result = (
          <Placeholder {...customProps} />
        );
      } else if (placeholderRender) {
        result = placeholderRender(customProps);
      } else {
        result = this.renderDefaultPlaceholder();
      }

      return result;
    }
  }

  renderDefaultPlaceholder () {
    let result;

    if (this.props.isActive) {
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
      const addSpotClick = this.addSpotClick.bind(this, 0, null);
      result = (
        <div>
          <span>Drop elements here or </span>
          <span className='link' onClick={addSpotClick} ref='spot0'>
            <span>click to add</span>
          </span>
        </div>
      );
    }

    return (
      <div className={cx('drop-placeholder', this.props.isActive && 'active')}>
        {result}
      </div>
    );
  }
}
