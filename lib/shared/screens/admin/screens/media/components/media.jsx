import Component from 'components/component';
import Content from 'components/content';
import ContentDisplays from 'components/content-displays';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentSearch from 'components/content-search';
import Upload from 'components/upload';
import React, {PropTypes} from 'react';
import {mergeFragments} from 'relate-js';

import styles from './media.less';
import List from './list';
import Sorting from './sorting';
import Uploading from './uploading';

export default class Media extends Component {
  static fragments = mergeFragments(
    List.fragments,
    {
      mediaCount: 1
    }
  );

  static propTypes = {
    media: PropTypes.array.isRequired,
    mediaCount: PropTypes.number,
    uploadMediaFiles: PropTypes.func.isRequired,
    uploadsVisible: PropTypes.bool.isRequired,
    search: PropTypes.string.isRequired,
    searchChange: PropTypes.func.isRequired,
    sort: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    toggleMediaSelection: PropTypes.func.isRequired,
    selected: PropTypes.array.isRequired,
    display: PropTypes.string.isRequired,
    changeMediaDisplay: PropTypes.func.isRequired
  };

  render () {
    const {uploadsVisible} = this.props;
    return (
      <div>
        {this.renderContent()}
        {uploadsVisible && <Uploading />}
      </div>
    );
  }

  renderContent () {
    const {mediaCount} = this.props;
    let result;
    if (mediaCount === 0) {
      result = this.renderNoContent();
    } else {
      result = this.renderHasContent();
    }
    return result;
  }

  renderNoContent () {
    const {uploadMediaFiles} = this.props;
    return (
      <Upload clickable={false} infos onFiles={uploadMediaFiles}>
        <div className={styles.none}>
          <div className={styles.noneContent}>
            <div className={styles.noneTitle}>
              You haven’t uploaded any media!
            </div>
            <div className={styles.noneText}>
              Just drag it into this window or click the upload button bellow.
            </div>
            <div className={styles.noneText}>
              Just worry about the upload, we’ll take care of categorizing it for you.
            </div>
            <Upload showInfos={false} className={styles.uploadButton} onFiles={uploadMediaFiles}>
              <i className='nc-icon-outline arrows-1_cloud-upload-94'></i>
              <span>Upload</span>
            </Upload>
          </div>
        </div>
      </Upload>
    );
  }

  renderHasContent () {
    const {
      media,
      uploadMediaFiles,
      search,
      searchChange,
      location,
      sort,
      order,
      toggleMediaSelection,
      selected,
      display,
      changeMediaDisplay
    } = this.props;
    return (
      <Upload clickable={false} infos onFiles={uploadMediaFiles}>
        <ContentHeader>
          <ContentSearch value={search} onChange={searchChange} />
          <ContentHeaderActions>
            <Sorting
              location={location}
              sort={sort}
              order={order}
            />
          <ContentDisplays display={display} onChange={changeMediaDisplay} />
          </ContentHeaderActions>
        </ContentHeader>
        <Content>
          <List media={media} toggleMediaSelection={toggleMediaSelection} selected={selected} display={display} />
        </Content>
      </Upload>
    );
  }
}
