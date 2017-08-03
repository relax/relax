import Component from 'components/component';
import Scrollable from 'components/scrollable';
import React from 'react';
import PropTypes from 'prop-types';

import Props from './props';
import TabEmpty from '../tab-empty';
import styles from './settings.less';

export default class SettingsTab extends Component {
  static propTypes = {
    selected: PropTypes.object,
    selectedElement: PropTypes.object,
    duplicate: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    isTemplate: PropTypes.bool.isRequired
  };

  render () {
    const {selected} = this.props;
    let result;

    if (selected && selected.id !== 'Body') {
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
    const {selected, selectedElement, duplicate, remove, isTemplate} = this.props;

    if (selected && selected.id !== 'Body') {
      let result;

      if (isTemplate) {
        result = (
          <div className={styles.template}>
            This is a template element
          </div>
        );
      } else if (selectedElement.subComponent) {
        result = (
          <div className={styles.subElement}>
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
