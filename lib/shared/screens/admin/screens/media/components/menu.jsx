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
    onNew: PropTypes.func.isRequired
  };

  render () {
    const {onBack, onNew} = this.props;

    return (
      <div>
        <ListHeader
          title='Media'
          onBack={onBack}
        >
          <Upload showInfos={false}>
            <button className={styles.uploadButton} onClick={onNew}>
              <i className='nc-icon-outline arrows-1_cloud-upload-94'></i>
            </button>
          </Upload>
        </ListHeader>
        <Scrollable className={styles.list}>
          <div>
            <Button link='#' label='All' icon='nc-icon-outline files_single-copies' active />
            <Button link='#' label='Images' icon='nc-icon-outline media-1_image-02'>
              <SubButton link='#' label='JPEG' />
              <SubButton link='#' label='PNG' />
              <SubButton link='#' label='ICO' />
            </Button>
            <Button link='#' label='Video' icon='nc-icon-outline media-1_play-69' />
            <Button link='#' label='Audio' icon='nc-icon-outline media-1_volume-98' />
          </div>
        </Scrollable>
      </div>
    );
  }
}
