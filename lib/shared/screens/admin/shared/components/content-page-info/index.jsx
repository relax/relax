import getGravatarImage from 'helpers/get-gravatar-image';
import moment from 'moment';
import Component from 'components/component';
import ModalDelete from 'components/modal-delete';
import React, {PropTypes} from 'react';

import styles from './index.less';
import Item from './item';

export default class PageInfo extends Component {
  static propTypes = {
    item: PropTypes.object,
    removeConfirm: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    cancelDelete: PropTypes.func.isRequired,
    confirmRemove: PropTypes.func.isRequired,
    publish: PropTypes.func.isRequired,
    unpublish: PropTypes.func.isRequired
  };

  static defaultProps = {
    item: {}
  };

  render () {
    const {item, onDelete} = this.props;
    let result;

    if (item) {
      const date = item.date && moment(item.date).format('LL');
      const updatedDate = item.updatedDate && moment(item.updatedDate).format('LL');

      const createdByUserImage = getGravatarImage(item.createdBy && item.createdBy.email || 'default', 20);
      const udpatedByUserImage = getGravatarImage(item.updatedBy && item.updatedBy.email || 'default', 20);

      result = (
        <div className={styles.root}>
          {this.renderStatus()}
          <div className={styles.infoList}>
            <Item label='Created at' value={date} icon='nc-icon-mini ui-1_calendar-60' />
            <Item label='Updated at' value={updatedDate} icon='nc-icon-mini ui-1_calendar-60' />
            <Item label='Created by' value={item.createdBy && item.createdBy.name} image={createdByUserImage} />
            <Item label='Updated by' value={item.updatedBy && item.updatedBy.name} image={udpatedByUserImage} />
          </div>
          <div className={styles.bottom}>
            <button className={styles.actionButton} onClick={onDelete}>
              Delete Page
            </button>
          </div>
          {this.renderDeleteConfirm()}
        </div>
      );
    } else {
      result = <div />;
    }

    return result;
  }

  renderStatus () {
    const {item} = this.props;
    let result;

    if (item.state === 'draft') {
      return this.renderDraftStatus();
    } else if (item.state === 'published') {
      return this.renderPublishedStatus();
    }

    return result;
  }

  renderDraftStatus () {
    const {publish} = this.props;
    return (
      <div className={styles.draft}>
        <button className={styles.publishButton} onClick={publish}>
          <i className='nc-icon-mini travel_world' />
          <span>Publish</span>
        </button>
        <div className={styles.label}>This page is still a draft</div>
      </div>
    );
  }

  renderPublishedStatus () {
    const {unpublish} = this.props;
    return (
      <div className={styles.draft}>
        <button className={styles.unpublishButton} onClick={unpublish}>
          <i className='nc-icon-mini arrows-1_back-78' />
          <span>Unpublish</span>
        </button>
        <div className={styles.label}>This page is published</div>
      </div>
    );
  }

  renderDeleteConfirm () {
    if (this.props.removeConfirm) {
      const {cancelDelete, confirmRemove, item} = this.props;
      return (
        <ModalDelete
          title={`Are you sure you want to remove "${item.title}"?`}
          cancel={cancelDelete}
          submit={confirmRemove}
        />
      );
    }
  }
}
