import cx from 'classnames';
import utils from 'helpers/utils';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {applyBackground, getColorString} from 'helpers/colors';

import styles from './gradient-points.less';

export default class GradientPoints extends Component {
  static propTypes = {
    editingPoint: PropTypes.number.isRequired,
    value: PropTypes.object.isRequired,
    colors: PropTypes.array.isRequired,
    changeEditingPoint: PropTypes.func.isRequired,
    pointPercChange: PropTypes.func.isRequired,
    addPoint: PropTypes.func.isRequired,
    removePoint: PropTypes.func.isRequired
  };

  constructor (props, children) {
    super(props, children);
    this.onMouseUpListener = this.onMouseUp.bind(this);
    this.onMouseMoveListener = this.onMouseMove.bind(this);
  }

  componentWillUnmount () {
    document.removeEventListener('mouseup', this.onMouseUpListener);
    document.removeEventListener('mousemove', this.onMouseMoveListener);
  }

  onMouseDown (index, event) {
    event.preventDefault();
    event.stopPropagation();

    this.activePoint = index;

    document.addEventListener('mouseup', this.onMouseUpListener);
    document.addEventListener('mousemove', this.onMouseMoveListener);
  }

  onMouseMove (event) {
    event.preventDefault();

    const bounds = utils.getOffsetRect(this.refs.bar);
    const perc = utils.limitNumber((event.pageX - bounds.left) / bounds.width, 0, 1);

    if (this.props.value.points.length > 2) {
      const verticalOffset = Math.abs(event.pageY - bounds.top);

      if (verticalOffset > 50) {
        this.activePointDelete = true;
      } else {
        this.activePointDelete = false;
      }
    }

    this.props.pointPercChange(this.activePoint, utils.roundSnap(perc * 100, [0, 25, 50, 75, 100]));
  }

  onMouseUp (event) {
    event.preventDefault();
    event.stopPropagation();
    this.componentWillUnmount();
    if (this.activePointDelete) {
      this.activePointDelete = false;
      this.props.removePoint(this.activePoint);
    }
  }

  markerClicked (number, event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.changeEditingPoint(number);
  }

  addPoint (event) {
    const bounds = utils.getOffsetRect(this.refs.bar);
    const perc = utils.limitNumber((event.pageX - bounds.left) / bounds.width, 0, 1);

    this.props.addPoint(Math.round(perc * 100));
  }

  render () {
    const gradStyle = {};
    applyBackground(gradStyle, Object.assign({}, this.props.value, {angle: 0, type: 'linear'}), this.props.colors);

    return (
      <div className={styles.root}>
        <div className={styles.points} ref='bar' onClick={::this.addPoint}>
          <div className={styles.gradient} style={gradStyle} />
          {this.props.value.points.map(this.renderPoint, this)}
        </div>
      </div>
    );
  }

  renderPoint (colorObj, index) {
    const markerStyle = {
      left: `${colorObj.perc}%`,
      transform: `translate(${-colorObj.perc}%, -50%)`
    };
    const selected = this.props.editingPoint === index;
    if (selected) {
      markerStyle.backgroundColor = getColorString(colorObj, this.props.colors);
    }
    if (this.activePoint === index && this.activePointDelete) {
      markerStyle.visibility = 'hidden';
    }
    const onClick = this.markerClicked.bind(this, index);
    const onMouseDown = this.onMouseDown.bind(this, index);

    return (
      <span
        className={cx(styles.marker, selected && styles.selected)}
        style={markerStyle}
        key={index}
        onClick={onClick}
        onMouseDown={onMouseDown}
      />
    );
  }
}
