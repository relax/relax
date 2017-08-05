import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './style-picker.less';
import Editing from './editing';
import List from './list';
import Selected from './selected';

export default class StylePicker extends Component {
  static propTypes = {
    editing: PropTypes.bool.isRequired,
    toggleEditing: PropTypes.func.isRequired,
    selectedStyle: PropTypes.object,
    onTitleChange: PropTypes.func.isRequired
  };

  render () {
    const {editing, toggleEditing, onTitleChange, selectedStyle} = this.props;

    return (
      <div>
        <Selected
          selectedStyle={selectedStyle}
          onClick={toggleEditing}
          onSubmit={onTitleChange}
          opened={editing}
        />
        <div className={styles.content}>
          {this.renderContent()}
        </div>
      </div>
    );
  }

  renderContent () {
    const {editing, selectedStyle, toggleEditing} = this.props;
    let result;

    if (editing) {
      result = (
        <Editing selectedStyle={selectedStyle} />
      );
    } else {
      result = (
        <List selectedStyle={selectedStyle} onChange={toggleEditing} />
      );
    }

    return result;
  }
}
