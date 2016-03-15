import Component from 'components/component';
import MediaItemPreview from 'components/media-item-preview';
import React, {PropTypes} from 'react';
import {mergeFragments} from 'relate-js';

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
      <div>
        <MediaItemPreview mediaItem={mediaItem} />
        <div>
          {mediaItem.name}
        </div>
      </div>
    );
  }
}
