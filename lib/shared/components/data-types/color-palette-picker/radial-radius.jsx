import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

export default class RadialRadius extends Component {
  static propTypes = {
    radius: PropTypes.string.isRequired,
    changeRadius: PropTypes.func.isRequired
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
      <div className='radial-radius'>
        <div className='lab'>Radius</div>
        <div className={cx('radius-option cc', radius === 'cc' && 'active')} onClick={this.onClick.bind(this, 'cc')}>
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
        <div className={cx('radius-option fc', radius === 'fc' && 'active')} onClick={this.onClick.bind(this, 'fc')}>
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
        <div className={cx('radius-option cs', radius === 'cs' && 'active')} onClick={this.onClick.bind(this, 'cs')}>
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
        <div className={cx('radius-option fs', radius === 'fs' && 'active')} onClick={this.onClick.bind(this, 'fs')}>
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
