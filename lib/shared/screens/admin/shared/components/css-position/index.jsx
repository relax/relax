import bind from 'decorators/bind';
import Component from 'components/component';
import DistancePicker from 'components/distance-picker';
import React from 'react';
import PropTypes from 'prop-types';
import NumberInput from 'components/input-options/number';
import styles from './index.less';
import PositionButton from './button';

export default class CssPositionOption extends Component {
  static propTypes = {
    values: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  @bind
  onDisplayChange (value) {
    const {onChange} = this.props;
    onChange('position', value);
  }

  @bind
  onPropChange (key, value) {
    const {onChange} = this.props;
    onChange(key, value);
  }

  @bind
  onZIndexChange (value) {
    const {onChange} = this.props;
    onChange('zIndex', value);
  }

  render () {
    const {position} = this.props.values;

    return (
      <div>
        <div>
          <PositionButton
            value='static'
            onChange={this.onDisplayChange}
            label='Static'
            active={position === 'static'}
          >
            <i className='nc-icon-outline ui-2_ban' />
          </PositionButton>
          <PositionButton
            value='relative'
            onChange={this.onDisplayChange}
            label='Relative'
            active={position === 'relative'}
          >
            <i className='nc-icon-outline design_path-minus' />
          </PositionButton>
          <PositionButton
            value='absolute'
            onChange={this.onDisplayChange}
            label='Absolute'
            active={position === 'absolute'}
          >
            <i className='nc-icon-outline design_path-intersect' />
          </PositionButton>
          <PositionButton
            value='fixed'
            onChange={this.onDisplayChange}
            label='Fixed'
            active={position === 'fixed'}
          >
            <i className='nc-icon-outline design_window-responsive' />
          </PositionButton>
        </div>
        {this.renderOptions()}
      </div>
    );
  }

  renderOptions () {
    const {values} = this.props;
    const {position} = values;

    if (position === 'relative' ||
        position === 'absolute' ||
        position === 'fixed') {
      const {top, right, bottom, left, zIndex} = values;

      return (
        <div className={styles.options}>
          <div className={styles.distanceHolder}>
            <DistancePicker
              top={top}
              right={right}
              bottom={bottom}
              left={left}
              width='70px'
              height='70px'
              onChange={this.onPropChange}
            />
          </div>
          <div className={styles.zIndex}>
            <div className={styles.label}>Z-index</div>
            <NumberInput
              value={zIndex || '0'}
              onChange={this.onZIndexChange}
              small
              min={false}
              className={styles.zIndexOption}
            />
          </div>
        </div>
      );
    }
  }
}
