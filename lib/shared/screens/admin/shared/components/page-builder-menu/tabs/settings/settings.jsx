import Component from 'components/component';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './settings.less';
import Props from './props';
import TabEmpty from '../tab-empty';

export default class SettingsTab extends Component {
  static propTypes = {
    selected: PropTypes.object,
    selectedElement: PropTypes.object,
    duplicate: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
  };

  render () {
    const {selected} = this.props;
    let result;

    if (selected && selected.id !== 'body') {
      result = this.renderContent();
    } else {
      result = this.renderNonSelected();
    }

    return result;
  }

  renderContent () {
    return (
      <div>
        {this.renderActionButtons()}
        <Scrollable autoshow className={styles.content}>
          <Props {...this.props} />
        </Scrollable>
      </div>
    );
  }

  renderNonSelected () {
    return (
      <TabEmpty />
    );
  }

  renderActionButtons () {
    const {selected, selectedElement, duplicate, remove} = this.props;

    if (selected && selected.id !== 'body') {
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
