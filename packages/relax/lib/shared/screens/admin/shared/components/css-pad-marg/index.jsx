import bind from 'decorators/bind';
import Component from 'components/component';
import DistancePicker from 'components/distance-picker';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class CssPadMarg extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    values: PropTypes.object
  };

  @bind
  onMarginChange (prop, value) {
    const {onChange} = this.props;
    onChange(`margin-${prop}`, value);
  }

  @bind
  onPaddingChange (prop, value) {
    const {onChange} = this.props;
    onChange(`padding-${prop}`, value);
  }

  render () {
    const {values} = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <DistancePicker
            top={values['margin-top'] || '0px'}
            right={values['margin-right'] || '0px'}
            bottom={values['margin-bottom'] || '0px'}
            left={values['margin-left'] || '0px'}
            width='180px'
            height='130px'
            label='Margin'
            onChange={this.onMarginChange}
          />
          <DistancePicker
            top={values['padding-top'] || '0px'}
            right={values['padding-right'] || '0px'}
            bottom={values['padding-bottom'] || '0px'}
            left={values['padding-left'] || '0px'}
            inside
            width='140px'
            height='90px'
            label='Padding'
            onChange={this.onPaddingChange}
            className={styles.padding}
          />
        </div>
      </div>
    );
  }
}
