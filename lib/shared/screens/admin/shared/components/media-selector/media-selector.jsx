import Component from 'components/component';
import Modal from 'components/modal';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './media-selector.less';
import List from './list';
import Sidebar from './sidebar';

export default class MediasSelector extends Component {
  static fragments = List.fragments;

  static propTypes = {
    media: PropTypes.array.isRequired,
    selected: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render () {
    const {media, selected, onClose, onChange} = this.props;
    return (
      <Modal big onClose={onClose}>
        <div className={styles.sidebar}>
          <Sidebar selected={selected} />
        </div>
        <Scrollable className={styles.wrapper}>
          <List
            media={media}
            selected={selected}
            onChange={onChange}
          />
        </Scrollable>
      </Modal>
    );
  }
}
