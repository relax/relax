import utils from 'helpers/utils';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './opacity.less';

export default class Opacity extends Component {
  static propTypes = {
    opacity: PropTypes.number.isRequired,
    opacityChange: PropTypes.func.isRequired,
    colr: PropTypes.object.isRequired
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

  onMouseDown (event) {
    event.preventDefault();
    event.stopPropagation();

    this.onMouseMove(event);

    document.addEventListener('mouseup', this.onMouseUpListener);
    document.addEventListener('mousemove', this.onMouseMoveListener);
  }

  onMouseMove (event) {
    event.preventDefault();

    const bounds = utils.getOffsetRect(this.refs.bar);
    const perc = utils.limitNumber((event.pageX - bounds.left) / bounds.width, 0, 1);

    this.props.opacityChange(Math.round(perc * 100));
  }

  onMouseUp (event) {
    event.preventDefault();
    event.stopPropagation();
    this.componentWillUnmount();
  }

  render () {
    const {opacity, colr} = this.props;
    const markerStyle = {
      left: `${opacity}%`,
      transform: `translate(${-opacity}%, -50%)`
    };
    const rgb = colr.toRgbObject();
    const gradStyle = {
      background:
        `linear-gradient(to right, rgba(${rgb.r},${rgb.g},${rgb.b},0) 0%,rgba(${rgb.r},${rgb.g},${rgb.b},1) 100%)`
    };

    return (
      <div className={styles.root}>
        <div className={styles.opacity} onMouseDown={::this.onMouseDown} ref='bar'>
          <span className={styles.gradient} style={gradStyle} />
          <span className={styles.marker} style={markerStyle} />
        </div>
      </div>
    );
  }
}
