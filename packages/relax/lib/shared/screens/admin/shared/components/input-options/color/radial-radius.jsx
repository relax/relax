import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './radial-radius.less';

export default class RadialRadius extends Component {
  static propTypes = {
    radius: PropTypes.string.isRequired,
    changeRadius: PropTypes.func.isRequired
  };

  init () {
    this.onCCClick = this.onClick.bind(this, 'cc');
    this.onFCClick = this.onClick.bind(this, 'fc');
    this.onCSClick = this.onClick.bind(this, 'cs');
    this.onFSClick = this.onClick.bind(this, 'fs');
  }

  onClick (radius, event) {
    event.preventDefault();
    this.props.changeRadius(radius);
  }

  render () {
    const radialCenterX = 6.25;
    const radialCenterY = 9;
    const {radius} = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.label}>Radius</div>
        <div
          className={cx(styles.option, styles.cc, radius === 'cc' && styles.active)}
          onClick={this.onCCClick}
        >
          <svg>
            <line
              x1={radialCenterX}
              y1={radialCenterY}
              x2={0}
              y2={0}
              strokeWidth='1'
              stroke={radius === 'cc' ? '#12a5ff' : '#4a4a4a'}
            />
            <circle
              cx={radialCenterX}
              cy={radialCenterY}
              r='1.5'
              fill={radius === 'cc' ? '#12a5ff' : '#4a4a4a'}
            />
            <circle
              cx={0}
              cy={0}
              r='1'
              fill={radius === 'cc' ? '#12a5ff' : '#4a4a4a'}
            />
          </svg>
        </div>
        <div
          className={cx(styles.option, styles.fc, radius === 'fc' && styles.active)}
          onClick={this.onFCClick}
        >
          <svg>
            <line
              x1={radialCenterX}
              y1={radialCenterY}
              x2={25}
              y2={0}
              strokeWidth='1'
              stroke={radius === 'fc' ? '#12a5ff' : '#4a4a4a'}
            />
            <circle
              cx={radialCenterX}
              cy={radialCenterY}
              r='1.5'
              fill={radius === 'fc' ? '#12a5ff' : '#4a4a4a'}
            />
            <circle
              cx={24}
              cy={0}
              r='1'
              fill={radius === 'fc' ? '#12a5ff' : '#4a4a4a'}
            />
          </svg>
        </div>
        <div
          className={cx(styles.option, styles.cs, radius === 'cs' && styles.active)}
          onClick={this.onCSClick}
        >
          <svg>
            <line
              x1={radialCenterX}
              y1={radialCenterY}
              x2={0}
              y2={radialCenterY}
              strokeWidth='1'
              stroke={radius === 'cs' ? '#12a5ff' : '#4a4a4a'}
            />
            <circle
              cx={radialCenterX}
              cy={radialCenterY}
              r='1.5'
              fill={radius === 'cs' ? '#12a5ff' : '#4a4a4a'}
            />
            <circle
              cx={0}
              cy={radialCenterY}
              r='1'
              fill={radius === 'cs' ? '#12a5ff' : '#4a4a4a'}
            />
          </svg>
        </div>
        <div
          className={cx(styles.option, styles.fs, radius === 'fs' && styles.active)}
          onClick={this.onFSClick}
        >
          <svg>
            <line
              x1={radialCenterX}
              y1={radialCenterY}
              x2={24}
              y2={radialCenterY}
              strokeWidth='1'
              stroke={radius === 'fs' ? '#12a5ff' : '#4a4a4a'}
            />
            <circle
              cx={radialCenterX}
              cy={radialCenterY}
              r='1.5'
              fill={radius === 'fs' ? '#12a5ff' : '#4a4a4a'}
            />
            <circle
              cx={24}
              cy={radialCenterY}
              r='1'
              fill={radius === 'fs' ? '#12a5ff' : '#4a4a4a'}
            />
          </svg>
        </div>
      </div>
    );
  }
}
