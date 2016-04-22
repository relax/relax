import bind from 'decorators/bind';
import cx from 'classnames';
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
    onClick: PropTypes.func.isRequired,
    mediaItem: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired
  };

  @bind
  onClick () {
    const {onClick, mediaItem} = this.props;
    onClick(mediaItem._id);
  }

  render () {
    const {mediaItem, selected} = this.props;
    const momentDate = moment(mediaItem.date);

    return (
      <div className={cx(styles.entry, selected && styles.selected)} onClick={this.onClick}>
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
