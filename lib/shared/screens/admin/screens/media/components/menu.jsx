import Button from 'components/menu-button';
import Component from 'components/component';
import ListHeader from 'components/list-header';
import Scrollable from 'components/scrollable';
import SubButton from 'components/menu-sub-button';
import Upload from 'components/upload';
import React, {PropTypes} from 'react';

import styles from './menu.less';

export default class MediaMenu extends Component {
  static propTypes = {
    children: PropTypes.node,
    pages: PropTypes.array.isRequired,
    onBack: PropTypes.func.isRequired,
    uploadMediaFiles: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  };

  getQuery (type) {
    const {location} = this.props;
    return Object.assign(
      {},
      location.query,
      {
        filter: type
      }
    );
  }

  render () {
    const {onBack, uploadMediaFiles, location} = this.props;
    const {filter = 'all'} = location.query;

    return (
      <div>
        <ListHeader
          title='Media'
          onBack={onBack}
        >
          <Upload showInfos={false} onFiles={uploadMediaFiles}>
            <button className={styles.uploadButton}>
              <i className='nc-icon-outline arrows-1_cloud-upload-94'></i>
            </button>
          </Upload>
        </ListHeader>
        <Scrollable className={styles.list}>
          <div>
            <Button
              link={location}
              query={this.getQuery('all')}
              label='All'
              icon='nc-icon-outline files_single-copies'
              active={filter === 'all'}
            />
            <Button
              link={location}
              query={this.getQuery('image')}
              label='Images'
              icon='nc-icon-outline media-1_image-02'
              active={filter.indexOf('image') !== -1 || filter === 'favicon'}
            >
              <SubButton
                link={location}
                query={this.getQuery('image/jpeg')}
                label='JPEG'
                active={filter === 'image/jpeg'}
              />
              <SubButton
                link={location}
                query={this.getQuery('image/png')}
                label='PNG'
                active={filter === 'image/png'}
              />
              <SubButton
                link={location}
                query={this.getQuery('favicon')}
                label='ICO'
                active={filter === 'favicon'}
              />
            </Button>
            <Button
              link={location}
              query={this.getQuery('video')}
              label='Video'
              icon='nc-icon-outline media-1_play-69'
              active={filter === 'video'}
            />
            <Button
              link={location}
              query={this.getQuery('audio')}
              label='Audio'
              icon='nc-icon-outline media-1_volume-98'
              active={filter === 'audio'}
            />
          </div>
        </Scrollable>
      </div>
    );
  }
}
