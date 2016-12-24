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
      date: 1,
      size: 1,
      dimension: {
        width: 1,
        height: 1
      }
    }
  }, MediaItemPreview.fragments);

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    mediaItem: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    display: PropTypes.string.isRequired
  };

  @bind
  onClick () {
    const {onClick, mediaItem} = this.props;
    onClick(mediaItem._id);
  }

  render () {
    const {mediaItem, selected, display} = this.props;
    const momentDate = moment(mediaItem.date);

    const sizes = display === 'list' ? {width: 250, height: 125} : {width: 300, height: 150};

    return (
      <div className={cx(styles[display], selected && styles.selected)} onClick={this.onClick}>
        <div className={styles.preview}>
          <MediaItemPreview mediaItem={mediaItem} {...sizes} />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>{mediaItem.name}</div>
          <div className={styles.date}>{momentDate.fromNow()}</div>
          {this.renderExtraInfo()}
        </div>
      </div>
    );
  }

  renderExtraInfo () {
    const {display, mediaItem} = this.props;
    if (display === 'list') {
      const {size, dimension} = mediaItem;
      return (
        <div className={styles.extras}>
          {size && <div className={styles.extra}>{size}</div>}
          {dimension && <div className={styles.extra}>{`${dimension.width}x${dimension.height}`}</div>}
        </div>
      );
    }
  }
}
