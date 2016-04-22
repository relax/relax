import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './list.less';
import Entry from './entry';
import MockEntry from './mock-entry';

export default class MediaSelectorList extends Component {
  static fragments = {
    media: Entry.fragments.mediaItem
  };

  static propTypes = {
    media: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    uploads: PropTypes.array.isRequired
  };

  render () {
    const {uploads} = this.props;
    const mocks = [];
    for (let i = uploads.length - 1; i >= 0; i--) {
      mocks.push(this.renderMockItem(uploads[i]));
    }

    return (
      <div className={styles.root}>
        {mocks}
        {this.props.media.map(this.renderItem, this)}
      </div>
    );
  }

  renderItem (mediaItem) {
    const {onChange} = this.props;
    return (
      <Entry mediaItem={mediaItem} onClick={onChange} key={mediaItem._id} />
    );
  }

  renderMockItem (upload, index) {
    const {status} = upload;

    if (status === 'queue' || status === 'uploading') {
      return (
        <MockEntry upload={upload} key={index} />
      );
    }
  }
}
