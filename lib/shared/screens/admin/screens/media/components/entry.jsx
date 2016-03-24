import moment from 'moment';
import Component from 'components/component';
import MediaItemPreview from 'components/media-item-preview';
import React, {PropTypes} from 'react';
import {mergeFragments} from 'relate-js';

import styles from './entry.less';

export default class MediaEntry extends Component {
  static fragments = mergeFragments({
    mediaItem: {
      _id: 1,
      name: 1,
      date: 1
    }
  }, MediaItemPreview.fragments);

  static propTypes = {
    mediaItem: PropTypes.object.isRequired
  };

  render () {
    const {mediaItem} = this.props;
    const momentDate = moment(mediaItem.date);

    return (
      <div className={styles.entry}>
        <div className={styles.preview}>
          <MediaItemPreview mediaItem={mediaItem} width={250} height={125} />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>{mediaItem.name}</div>
          <div className={styles.date}>{momentDate.fromNow()}</div>
        </div>
      </div>
    );
  }
}
