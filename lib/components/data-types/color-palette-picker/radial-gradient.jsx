import cx from 'classnames';
import forEach from 'lodash.foreach';
import sortBy from 'lodash.sortby';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import utils from '../../../utils';
import {applyBackground, getColorString} from '../../../helpers/colors';

const size = 316;

export default class RadialGradient extends Component {
  static propTypes = {
    editingPoint: PropTypes.number.isRequired,
    value: PropTypes.object.isRequired,
    colors: PropTypes.array.isRequired,
    changeEditingPoint: PropTypes.func.isRequired,
    pointPercChange: PropTypes.func.isRequired,
    addPoint: PropTypes.func.isRequired,
    changeCenter: PropTypes.func.isRequired
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
      y: utils.limitNumber((event.pageY - bounds.top) / bounds.height, 0, 1)
    };

    if (this.activeFirst) {
      this.props.changeCenter({
        top: utils.roundSnap(point.y * 100, [0, 25, 50, 75, 100]),
        left: utils.roundSnap(point.x * 100, [0, 25, 50, 75, 100])
      });
    } else {
      const {pointA, pointB} = this.getRadialLine();

      const newPoint = {
        x: point.x * size,
        y: point.y * size
      };

      const xDelta = pointA.x - pointB.x;
      const yDelta = pointA.y - pointB.y;
      const u = 1 - ((newPoint.x - pointB.x) * xDelta + (newPoint.y - pointB.y) * yDelta) / (xDelta * xDelta + yDelta * yDelta);

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
      const total = utils.pointsDistance(pointA, pointB);
      const dist = utils.pointsDistance(pointB, closestPoint);

      this.props.pointPercChange(this.activePoint, utils.roundSnap(dist / total * 100, [0, 25, 50, 75, 100]));
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

  onLineClick (event) {
    event.preventDefault();

    const bounds = utils.getOffsetRect(this.refs.holder);
    const point = {
      x: utils.limitNumber((event.pageX - bounds.left) / bounds.width, 0, 1),
      y: utils.limitNumber((event.pageY - bounds.top) / bounds.height, 0, 1)
    };

    const {pointA, pointB} = this.getRadialLine();
    const newPoint = {
      x: point.x * size,
      y: point.y * size
    };

    const total = utils.pointsDistance(pointA, pointB);
    const dist = utils.pointsDistance(pointA, newPoint);

    this.props.addPoint(Math.round(dist / total * 100));
  }

  getRadialLine () {
    const radius = this.props.value.radius;
    const center = this.props.value.center;

    const pointA = {
      x: size * center.left / 100,
      y: size * center.top / 100
    };
    let pointB;

    if (radius[1] === 'c') {
      let closestPoint;
      let closestDistance = 999;
      let farthestPoint;
      let farthestDistance = 0;

      const corners = [
        {x: 0, y: 0},
        {x: size, y: 0},
        {x: size, y: size},
        {x: 0, y: size}
      ];

      forEach(corners, (cornerPoint) => {
        const distance = utils.pointsDistance(pointA, cornerPoint);
        if (distance > farthestDistance) {
          farthestDistance = distance;
          farthestPoint = cornerPoint;
        }
        if (distance < closestDistance) {
          closestDistance = distance;
          closestPoint = cornerPoint;
        }
      });

      if (radius === 'fc') {
        pointB = farthestPoint;
      } else {
        pointB = closestPoint;
      }
    } else {
      let closestPoint;
      let closestDistance = 999;
      let farthestPoint;
      let farthestDistance = 0;

      const sides = [
        {x: 0, y: pointA.y},
        {x: pointA.x, y: 0},
        {x: size, y: pointA.y},
        {x: pointA.x, y: size}
      ];

      forEach(sides, (sidePoint) => {
        const distance = utils.pointsDistance(pointA, sidePoint);
        if (distance > farthestDistance) {
          farthestDistance = distance;
          farthestPoint = sidePoint;
        }
        if (distance < closestDistance) {
          closestDistance = distance;
          closestPoint = sidePoint;
        }
      });

      if (radius === 'fs') {
        pointB = farthestPoint;
      } else {
        pointB = closestPoint;
      }
    }

    return {
      pointA,
      pointB
    };
  }

  render () {
    return (
      <div className='radial-gradient' ref='holder'>
        {this.renderContent()}
      </div>
    );
  }

  renderContent () {
    const gradStyle = {};
    applyBackground(gradStyle, this.props.value, this.props.colors);

    const radialLine = this.getRadialLine();

    const orderedPoints = sortBy(this.props.value.points, 'perc');
    const firstPointPosition = utils.getPointInLineByPerc(radialLine.pointA, radialLine.pointB, orderedPoints[0].perc);
    const lastPointPosition = utils.getPointInLineByPerc(radialLine.pointA, radialLine.pointB, orderedPoints[orderedPoints.length - 1].perc);

    return (
      <div className='lg-content' style={gradStyle} key={this.props.value.radius}>
        <svg className='line-svg' key='lineSvg'>
          <line
            className='line'
            x1={firstPointPosition.x}
            y1={firstPointPosition.y}
            x2={lastPointPosition.x}
            y2={lastPointPosition.y}
            strokeWidth='2'
            stroke='#ffffff'
            onClick={::this.onLineClick}
          />
        </svg>
        {this.props.value.points.map(this.renderPoint.bind(this, radialLine.pointA, radialLine.pointB))}
      </div>
    );
  }

  renderPoint (pointA, pointB, colorObj, index) {
    const pointPosition = utils.getPointInLineByPerc(pointA, pointB, colorObj.perc);
    const selected = this.props.editingPoint === index;
    const style = {
      left: pointPosition.x,
      top: pointPosition.y,
      backgroundColor: getColorString(colorObj, this.props.colors)
    };
    return (
      <div
        key={index}
        className={cx('point', selected && 'selected')}
        style={style}
        onClick={this.markerClicked.bind(this, index)}
        onMouseDown={this.onMouseDown.bind(this, index)}
      />
    );
  }
}
