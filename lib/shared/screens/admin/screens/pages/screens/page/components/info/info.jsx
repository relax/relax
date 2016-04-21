import getGravatarImage from 'helpers/get-gravatar-image';
import moment from 'moment';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './info.less';
import Item from './item';

export default class PageInfo extends Component {
  static fragments = {
    page: {
      _id: 1,
      state: 1,
      date: 1,
      updatedDate: 1,
      createdBy: {
        _id: 1,
        email: 1,
        name: 1
      },
      updatedBy: {
        _id: 1,
        email: 1,
        name: 1
      }
    }
  };

  static propTypes = {
    page: PropTypes.object,
    onDelete: PropTypes.func.isRequired,
    publishPage: PropTypes.func.isRequired,
    unpublishPage: PropTypes.func.isRequired
  };

  static defaultProps = {
    page: {}
  };

  render () {
    const {page, onDelete} = this.props;
    const date = page.date && moment(page.date).format('LL');
    const updatedDate = page.updatedDate && moment(page.updatedDate).format('LL');

    const createdByUserImage = getGravatarImage(page.createdBy && page.createdBy.email || 'default', 20);
    const udpatedByUserImage = getGravatarImage(page.updatedBy && page.updatedBy.email || 'default', 20);

    return (
      <div className={styles.root}>
        {this.renderStatus()}
        <div className={styles.infoList}>
          <Item label='Created at' value={date} icon='nc-icon-mini ui-1_calendar-60' />
          <Item label='Updated at' value={updatedDate} icon='nc-icon-mini ui-1_calendar-60' />
          <Item label='Created by' value={page.createdBy && page.createdBy.name} image={createdByUserImage} />
          <Item label='Updated by' value={page.updatedBy && page.updatedBy.name} image={udpatedByUserImage} />
        </div>
        <div className={styles.bottom}>
          <button className={styles.actionButton} onClick={onDelete}>
            Delete Page
          </button>
        </div>
      </div>
    );
  }

  renderStatus () {
    const {page} = this.props;
    let result;

    if (page.state === 'draft') {
      return this.renderDraftStatus();
    } else if (page.state === 'published') {
      return this.renderPublishedStatus();
    }

    return result;
  }

  renderDraftStatus () {
    const {publishPage} = this.props;
    return (
      <div className={styles.draft}>
        <button className={styles.publishButton} onClick={publishPage}>
          <i className='nc-icon-mini travel_world' />
          <span>Publish</span>
        </button>
        <div className={styles.label}>This page is still a draft</div>
      </div>
    );
  }

  renderPublishedStatus () {
    const {unpublishPage} = this.props;
    return (
      <div className={styles.draft}>
        <button className={styles.unpublishButton} onClick={unpublishPage}>
          <i className='nc-icon-mini arrows-1_back-78' />
          <span>Unpublish</span>
        </button>
        <div className={styles.label}>This page is published</div>
      </div>
    );
  }
}
