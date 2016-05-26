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
    updateColorFromState: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired
  };

  render () {
    const {
      label,
      value,
      changeColorLabel,
      changeColorValue,
      createColor,
      updateColorFromState,
      loading,
      editing
    } = this.props;

    return (
      <ModalNew
        submitLabel={editing ? 'Change' : 'Add'}
        submit={editing ? updateColorFromState : createColor}
        loading={loading}
        className={styles.root}
      >
        <div className={styles.colorHolder}>
          <ColorPicker
            value={value}
            onChange={changeColorValue}
            white
            showOpacity={false}
            showCollection={false}
            noPicker
          />
        </div>
        <ModalInput
          value={label}
          placeholder='Give it a name'
          onChange={changeColorLabel}
        />
      </ModalNew>
    );
  }
}
