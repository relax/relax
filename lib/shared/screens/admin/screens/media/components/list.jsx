import Component from 'components/component';
import React, {PropTypes} from 'react';

import Entry from './entry';

export default class MediaList extends Component {
  static fragments = {
    media: Entry.fragments.mediaItem
  };

  static propTypes = {
    media: PropTypes.array.isRequired,
    toggleMediaSelection: PropTypes.func.isRequired,
    selected: PropTypes.array.isRequired,
    display: PropTypes.string.isRequired
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
    const {toggleMediaSelection, selected, display} = this.props;
    return (
      <Entry
        mediaItem={mediaItem}
        onClick={toggleMediaSelection}
        selected={selected.indexOf(mediaItem._id) !== -1}
        display={display}
        key={mediaItem._id}
      />
    );
  }
}
