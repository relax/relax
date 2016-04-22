import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './list.less';
import Entry from './entry';

export default class MediaSelectorList extends Component {
  static fragments = {
    media: Entry.fragments.mediaItem
  };

  static propTypes = {
    media: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className={styles.root}>
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
}
