import moment from 'moment';
import Component from 'components/component';
import MediaItemPreview from 'components/media-item-preview';
import React, {PropTypes} from 'react';
import {mergeFragments} from 'relate-js';

import styles from './selected.less';

export default class MediaSelectorSelected extends Component {
  static fragments = mergeFragments({
    mediaItem: {
      _id: 1,
      date: 1,
      name: 1,
      size: 1,
      dimension: {
        width: 1,
        height: 1
      }
    }
  }, MediaItemPreview.fragments);

  static propTypes = {
    selected: PropTypes.string,
    mediaItem: PropTypes.object
  };

  render () {
    const {mediaItem, selected} = this.props;
    let result;
    if (selected && mediaItem) {
      const date = moment(mediaItem.date).format('Do MMMM YYYY');

      result = (
        <div className={styles.root}>
          <div className={styles.wrapper}>
            <div className={styles.imagePart}>
              <MediaItemPreview mediaItem={mediaItem} width={100} height={100} />
            </div>
            <div className={styles.infoPart}>
              <div className={styles.title}>
                {mediaItem.name}
              </div>
              <div className={styles.underTitle}>
                {date}
              </div>
              {mediaItem.dimension && mediaItem.dimension.width &&
                <div className={styles.underTitle}>
                  {`${mediaItem.dimension.width}x${mediaItem.dimension.height}`}
                </div>
              }
              <div className={styles.underTitle}>
                {mediaItem.size}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      result = (
        <div className={styles.root}>
          <div className={styles.wrapper}>
            <div className={styles.imagePart}>
              <div className={styles.dummyImage}></div>
            </div>
            <div className={styles.infoPart}>
              <div className={styles.underTitle}>
                Nothing selected
              </div>
            </div>
          </div>
        </div>
      );
    }

    return result;
  }
}
