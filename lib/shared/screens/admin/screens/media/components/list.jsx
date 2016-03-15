import Component from 'components/component';
import React, {PropTypes} from 'react';

import Entry from './entry';

export default class MediaList extends Component {
  static fragments = {
    media: Entry.fragments.mediaItem
  };

  static propTypes = {
    media: PropTypes.array.isRequired
  };

  render () {
    const {media} = this.props;

    return (
      <div>
        {media.map(this.renderEntry, this)}
      </div>
    );
  }

  renderEntry (mediaItem) {
    return (
      <Entry
        mediaItem={mediaItem}
        key={mediaItem._id}
      />
    );
  }
}
