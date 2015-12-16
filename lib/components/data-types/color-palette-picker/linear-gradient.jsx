import cx from 'classnames';
import sortBy from 'lodash.sortby';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import utils from '../../../utils';
import {applyBackground, getColorString} from '../../../helpers/colors';

export default class LinearGradient extends Component {
  static propTypes = {
    editingPoint: PropTypes.number.isRequired,
    value: PropTypes.object.isRequired,
    colors: PropTypes.array.isRequired,
    changeEditingPoint: PropTypes.func.isRequired,
    pointPercChange: PropTypes.func.isRequired,
    changeAngle: PropTypes.func.isRequired
  }

  constructor (props, children) {
    super(props, children);
    this.onMouseUpListener = this.onMouseUp.bind(this);
    this.onMouseMoveListener = this.onMouseMove.bind(this);
  }

  getInitState () {
    return {
      dragging: false
    };
  }

  componentWillUnmount () {
    document.removeEventListener('mouseup', this.onMouseUpListener);
    document.removeEventListener('mousemove', this.onMouseMoveListener);
  }

  markerClicked (number) {
    this.props.changeEditingPoint(number);
  }

  onMouseDown (index, event) {
    event.preventDefault();
    event.stopPropagation();

    const orderedPoints = sortBy(this.props.value.points, 'perc');
    this.activePoint = index;
    this.activeFirst = orderedPoints[0] === this.props.value.points[index];
    this.activeLast = orderedPoints[orderedPoints.length - 1] === this.props.value.points[index];

    this.setState({
      dragging: true
    });

    document.addEventListener('mouseup', this.onMouseUpListener);
    document.addEventListener('mousemove', this.onMouseMoveListener);
  }

  onMouseMove (event) {
    event.preventDefault();

    const bounds = utils.getOffsetRect(this.refs.holder);
    const point = {
      x: utils.limitNumber((event.pageX - bounds.left) / bounds.width, 0, 1),
      y: 1 - utils.limitNumber((event.pageY - bounds.top) / bounds.height, 0, 1)
    };

    if (this.activeFirst || this.activeLast) {
      // point.y = 1 - point.y;
      const center = {
        x: 0.5,
        y: 0.5
      };
      let newAngle = Math.round(this.getLineAngle(center, point));
      if (this.activeFirst) {
        newAngle -= 180;
        if (newAngle < 0) {
          newAngle += 360;
        }
      }
      this.props.changeAngle(newAngle);
    } else {
      const pointA = this.getRectPoint(this.props.value.angle, 158);
      const pointB = {
        x: -pointA.x,
        y: -pointA.y
      };

      const newPoint = {
        x: ((point.x - 0.5) * 2) * 156,
        y: ((point.y - 0.5) * 2) * 156
      };

      const xDelta = pointA.x - pointB.x;
      const yDelta = pointA.y - pointB.y;
      const u = ((newPoint.x - pointB.x) * xDelta + (newPoint.y - pointB.y) * yDelta) / (xDelta * xDelta + yDelta * yDelta);

      let closestPoint;
      if (u < 0) {
        closestPoint = {
          x: pointB.x,
          y: pointB.y
        };
      } else if (u > 1) {
        closestPoint = {
          x: pointA.x,
          y: pointA.y
        };
      } else {
        closestPoint = {
          x: Math.round(pointB.x + u * xDelta),
          y: Math.round(pointB.y + u * yDelta)
        };
      }
      const total = this.pointsDistance(pointA, pointB);
      const dist = this.pointsDistance(pointB, closestPoint);

      this.props.pointPercChange(this.activePoint, Math.round(dist / total * 100));
    }
  }

  onMouseUp (event) {
    event.preventDefault();
    event.stopPropagation();
    this.componentWillUnmount();

    this.setState({
      dragging: false
    });
  }

  pointsDistance (p1, p2) {
    const distX = p1.x - p2.x;
    const distY = p1.y - p2.y;
    return Math.sqrt(distX * distX + distY * distY);
  }

  getLineAngle (pointA, pointB) {
    const dy = pointB.y - pointA.y;
    const dx = pointB.x - pointA.x;
    let theta = Math.atan2(dy, dx) * 180 / Math.PI; // range (-180, 180)
    if (theta < 0) {
      theta += 360;
    }
    return theta;
  }

  getRectPoint (angle, radius) {
    const result = {
      x: 0,
      y: 0
    };
    if (angle >= 0 && angle <= 45) {
      result.x = radius;
      result.y = radius * Math.tan(angle * Math.PI / 180);
    } else if (angle > 45 && angle <= 90) {
      result.x = radius * Math.tan((45 - (angle - 45)) * Math.PI / 180);
      result.y = radius;
    } else if (angle > 90 && angle <= 180) {
      const calc = this.getRectPoint(angle - 90, radius);
      result.x = -calc.y;
      result.y = calc.x;
    } else if (angle > 180 && angle <= 270) {
      const calc = this.getRectPoint(angle - 180, radius);
      result.x = -calc.x;
      result.y = -calc.y;
    } else if (angle > 270 && angle <= 360) {
      const calc = this.getRectPoint(angle - 270, radius);
      result.x = calc.y;
      result.y = -calc.x;
    }
    return result;
  }

  getPointInLine (pointA, pointB, perc) {
    // PA + t / 100 * (PA - PB)
    return {
      x: pointA.x + perc / 100 * (pointB.x - pointA.x),
      y: pointA.y + perc / 100 * (pointB.y - pointA.y)
    };
  }

  render () {
    return (
      <div className='linear-gradient' ref='holder'>
        {this.renderContent()}
      </div>
    );
  }

  renderContent () {
    const gradStyle = {};
    applyBackground(gradStyle, this.props.value, this.props.colors);

    const angle = this.props.value.angle;
    const pointA = this.getRectPoint(angle, 158);
    const pointB = {
      x: -pointA.x,
      y: -pointA.y
    };

    // relative to html axis
    pointA.x = pointA.x + 158;
    pointA.y = 158 - pointA.y;
    pointB.x = pointB.x + 158;
    pointB.y = 158 - pointB.y;

    const orderedPoints = sortBy(this.props.value.points, 'perc');
    const firstPointPosition = this.getPointInLine(pointB, pointA, orderedPoints[0].perc);
    const lastPointPosition = this.getPointInLine(pointB, pointA, orderedPoints[orderedPoints.length - 1].perc);

    return (
      <div className='lg-content' style={gradStyle}>
        <svg className='line-svg' key='lineSvg'>
          <line
            className='line'
            x1={firstPointPosition.x}
            y1={firstPointPosition.y}
            x2={lastPointPosition.x}
            y2={lastPointPosition.y}
            strokeWidth='2'
            stroke='#ffffff'
          />
        </svg>
        {this.props.value.points.map(this.renderPoint.bind(this, pointA, pointB))}
        {this.state.dragging && (this.activeFirst || this.activeLast) && <div className='angle-info' key='angle'>{angle + 'º'}</div>}
      </div>
    );
  }

  renderPoint (pointA, pointB, colorObj, index) {
    const pointPosition = this.getPointInLine(pointB, pointA, colorObj.perc);
    const selected = this.props.editingPoint === index;
    const style = {
      left: pointPosition.x,
      top: pointPosition.y,
      backgroundColor: getColorString(colorObj, this.props.colors)
    };
    return (
      <div key={index} className={cx('point', selected && 'selected')} style={style} onClick={this.markerClicked.bind(this, index)} onMouseDown={this.onMouseDown.bind(this, index)} />
    );
  }
}
