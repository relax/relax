import cx from 'classnames';
import sortBy from 'lodash.sortby';
import utils from 'helpers/utils';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {applyBackground, getColorString} from 'helpers/colors';

import styles from './linear-gradient.less';

export default class LinearGradient extends Component {
  static propTypes = {
    editingPoint: PropTypes.number.isRequired,
    value: PropTypes.object.isRequired,
    colors: PropTypes.array.isRequired,
    changeEditingPoint: PropTypes.func.isRequired,
    pointPercChange: PropTypes.func.isRequired,
    addPoint: PropTypes.func.isRequired,
    changeAngle: PropTypes.func.isRequired
  };

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
      const lineAngle = this.getLineAngle(center, point);

      let newAngle;
      if (lineAngle > 359 && lineAngle < 360) {
        newAngle = 0;
      } else {
        newAngle = utils.roundSnap(lineAngle, [0, 45, 90, 135, 180, 225, 270, 315]);
      }

      if (this.activeFirst) {
        newAngle -= 180;
        if (newAngle < 0) {
          newAngle += 360;
        }
      }
      this.props.changeAngle(newAngle);
    }
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
    const u =
      ((newPoint.x - pointB.x) * xDelta + (newPoint.y - pointB.y) * yDelta) /
      (xDelta * xDelta + yDelta * yDelta);

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
      y: 1 - utils.limitNumber((event.pageY - bounds.top) / bounds.height, 0, 1)
    };

    const pointA = this.getRectPoint(this.props.value.angle, 158);
    const pointB = {
      x: -pointA.x,
      y: -pointA.y
    };
    const newPoint = {
      x: ((point.x - 0.5) * 2) * 156,
      y: ((point.y - 0.5) * 2) * 156
    };

    const total = utils.pointsDistance(pointA, pointB);
    const dist = utils.pointsDistance(pointB, newPoint);

    this.props.addPoint(Math.round(dist / total * 100));
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

  render () {
    return (
      <div className={styles.root} ref='holder'>
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
    const firstPointPosition = utils.getPointInLineByPerc(
      pointB,
      pointA,
      orderedPoints[0].perc
    );
    const lastPointPosition = utils.getPointInLineByPerc(
      pointB,
      pointA,
      orderedPoints[orderedPoints.length - 1].perc
    );

    return (
      <div className={styles.content} style={gradStyle}>
        <svg className={styles.lineSVG} key='lineSvg'>
          <line
            className={styles.line}
            x1={firstPointPosition.x}
            y1={firstPointPosition.y}
            x2={lastPointPosition.x}
            y2={lastPointPosition.y}
            strokeWidth='2'
            stroke='#ffffff'
            onClick={::this.onLineClick}
          />
        </svg>
        {this.props.value.points.map(this.renderPoint.bind(this, pointA, pointB))}
        {this.renderAngle()}
      </div>
    );
  }

  renderPoint (pointA, pointB, colorObj, index) {
    const pointPosition = utils.getPointInLineByPerc(pointB, pointA, colorObj.perc);
    const selected = this.props.editingPoint === index;
    const style = {
      left: pointPosition.x,
      top: pointPosition.y,
      backgroundColor: getColorString(colorObj, this.props.colors)
    };
    const onClick = this.markerClicked.bind(this, index);
    const onMouseDown = this.onMouseDown.bind(this, index);

    return (
      <div
        key={index}
        className={cx(style.point, selected && style.selected)}
        style={style}
        onClick={onClick}
        onMouseDown={onMouseDown}
      />
    );
  }

  renderAngle () {
    if (this.state.dragging && (this.activeFirst || this.activeLast)) {
      const angle = this.props.value.angle;
      return (
        <div className={styles.angleInfo} key='angle'>
          {`${angle}º`}
        </div>
      );
    }
  }
}
