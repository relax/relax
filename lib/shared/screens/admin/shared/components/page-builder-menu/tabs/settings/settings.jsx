import Component from 'components/component';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './settings.less';
import Props from './props';

export default class SettingsTab extends Component {
  static propTypes = {
    selectedId: PropTypes.string,
    selectedElement: PropTypes.object,
    duplicate: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
  };

  render () {
    return (
      <div>
        {this.renderActionButtons()}
        <Scrollable autoshow className={styles.content}>
          {this.renderContent()}
        </Scrollable>
      </div>
    );
  }

  renderContent () {
    const {selectedId} = this.props;
    let result;

    if (selectedId && selectedId !== 'body') {
      result = <Props {...this.props} />;
    } else {
      result = this.renderNonSelected();
    }

    return result;
  }

  renderNonSelected () {
    return (
      <div className={styles.info}>
        <i className='nc-icon-outline media-1_touch'></i>
        <div className={styles.label}>Relax, you have to select an element first!</div>
      </div>
    );
  }

  renderActionButtons () {
    const {selectedId, selectedElement, duplicate, remove} = this.props;

    if (selectedId && selectedId !== 'body') {
      let result;

      if (selectedElement.subComponent) {
        result = (
          <div>
            This is a sub element
          </div>
        );
      } else {
        result = (
          <div className={styles.actions}>
            <button className={styles.action} onClick={duplicate}>
              <i className='nc-icon-mini files_single-copy-04'></i>
              <span>Duplicate</span>
            </button>
            <button className={styles.action} onClick={remove}>
              <i className='nc-icon-mini ui-1_trash'></i>
              <span>Remove</span>
            </button>
          </div>
        );
      }

      return result;
    }
  }
}
