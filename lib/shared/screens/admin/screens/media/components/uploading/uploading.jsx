import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './uploading.less';
import Item from './item';

export default class Uploading extends Component {
  static propTypes = {
    uploads: PropTypes.array.isRequired
  };

  render () {
    const {uploads} = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.title}>Uploads</div>
        <div className={styles.list}>
          {uploads.map(this.renderUpload, this)}
        </div>
      </div>
    );
  }

  renderUpload (item) {
    return (
      <Item {...item} key={item.id} />
    );
  }
}
