import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './color-picker.less';
import Hue from './hue';
import SatLight from './sat-light';

export default class ColorPicker extends Component {
  static propTypes = {
    colr: PropTypes.object.isRequired
  };

  render () {
    const {colr} = this.props;
    const hsv = colr.toHsvObject();

    return (
      <div className={styles.root}>
        <SatLight {...this.props} hsv={hsv} />
        <Hue {...this.props} hsv={hsv} />
      </div>
    );
  }
}
