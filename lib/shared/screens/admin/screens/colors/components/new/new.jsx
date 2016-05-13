import ColorPicker from 'components/input-options/color';
import Component from 'components/component';
import ModalInput from 'components/modal-input';
import ModalNew from 'components/modal-new';
import React, {PropTypes} from 'react';

import styles from './new.less';

export default class NewColor extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    changeColorLabel: PropTypes.func.isRequired,
    changeColorValue: PropTypes.func.isRequired,
    createColor: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  };

  render () {
    const {label, value, changeColorLabel, changeColorValue, createColor, loading} = this.props;
    return (
      <ModalNew submit={createColor} loading={loading}>
        <ModalInput
          focus
          value={label}
          placeholder='Name your color. e.g. Primary'
          onChange={changeColorLabel}
        />
        <div className={styles.value}>
          <div className={styles.label}>Color value</div>
          <ColorPicker
            value={value}
            onChange={changeColorValue}
            white
            showOpacity={false}
            showCollection={false}
          />
        </div>
      </ModalNew>
    );
  }
}
