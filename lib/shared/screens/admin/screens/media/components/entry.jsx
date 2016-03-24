import Component from 'components/component';
import MediaItemPreview from 'components/media-item-preview';
import React, {PropTypes} from 'react';
import {mergeFragments} from 'relate-js';

import styles from './entry.less';

export default class MediaEntry extends Component {
  static fragments = mergeFragments({
    mediaItem: {
      _id: 1,
      name: 1
    }
  }, MediaItemPreview.fragments);

  static propTypes = {
    mediaItem: PropTypes.object.isRequired
  };

  render () {
    const {mediaItem} = this.props;

    return (
      <div className={styles.entry}>
        <div className={styles.preview}>
          <MediaItemPreview mediaItem={mediaItem} width={250} height={125} />
        </div>
        <div className={styles.name}>
          {mediaItem.name}
        </div>
      </div>
    );
  }
}
