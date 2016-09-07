import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './style-picker.less';
import Editing from './editing';
import List from './list';

export default class StylePicker extends Component {
  static propTypes = {
    editing: PropTypes.bool.isRequired,
    toggleEditing: PropTypes.func.isRequired,
    selectedStyle: PropTypes.object
  };

  render () {
    const {editing, toggleEditing, selectedStyle} = this.props;

    return (
      <div>
        <div className={styles.selected} onClick={toggleEditing}>
          <span>{selectedStyle && selectedStyle.title || 'No style'}</span>
          <i className={cx(
              'nc-icon-outline',
              editing ? 'arrows-1_minimal-up' : 'arrows-1_minimal-down'
            )}
          />
        </div>
        <div className={styles.content}>
          {this.renderContent()}
        </div>
      </div>
    );
  }

  renderContent () {
    const {editing, selectedStyle} = this.props;
    let result;

    if (editing) {
      result = (
        <Editing selectedStyle={selectedStyle} />
      );
    } else {
      result = (
        <List selectedStyle={selectedStyle} />
      );
    }

    return result;
  }
}
