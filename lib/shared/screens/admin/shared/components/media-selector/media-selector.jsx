import Component from 'components/component';
import Modal from 'components/modal';
import Scrollable from 'components/scrollable';
import Upload from 'components/upload';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './media-selector.less';
import List from './list';
import Sidebar from './sidebar';

export default class MediasSelector extends Component {
  static fragments = List.fragments;

  static propTypes = {
    media: PropTypes.array.isRequired,
    selected: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    changeSort: PropTypes.func.isRequired,
    changeOrder: PropTypes.func.isRequired,
    changeType: PropTypes.func.isRequired,
    sort: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    allowedType: PropTypes.string.isRequired,
    uploadMediaFiles: PropTypes.func.isRequired,
    uploads: PropTypes.array.isRequired
  };

  render () {
    const {media, selected, onClose, onChange, uploadMediaFiles, uploads} = this.props;
    return (
      <Modal big onClose={onClose}>
        <Upload clickable={false} infos onFiles={uploadMediaFiles}>
          {this.renderSidebar()}
          <Scrollable className={styles.wrapper}>
            <List
              media={media}
              selected={selected}
              onChange={onChange}
              uploads={uploads}
              onClose={onClose}
            />
          </Scrollable>
        </Upload>
      </Modal>
    );
  }

  renderSidebar () {
    const {selected, onClose, changeSort, changeOrder, changeType, sort, order, type, allowedType} = this.props;
    return (
      <div className={styles.sidebar}>
        <Sidebar
          selected={selected}
          changeSort={changeSort}
          changeOrder={changeOrder}
          changeType={changeType}
          sort={sort}
          order={order}
          type={type}
          allowedType={allowedType}
          onClose={onClose}
        />
      </div>
    );
  }
}
