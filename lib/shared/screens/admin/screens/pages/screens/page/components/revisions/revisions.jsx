import Component from 'components/component';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './revisions.less';
import Revision from './revision';

export default class Revisions extends Component {
  static fragments = {
    revisions: Revision.fragments.revision
  };

  static propTypes = {
    revisions: PropTypes.array,
    current: PropTypes.object
  };

  render () {
    const {revisions, current} = this.props;
    this.len = revisions && revisions.length;

    return (
      <Scrollable>
        <div className={styles.header}>Revisions</div>
        <div className={styles.revisions}>
          {current && this.renderCurrent(current)}
          {revisions && revisions.map(this.renderRevision, this)}
        </div>
      </Scrollable>
    );
  }

  renderRevision (revision, index) {
    return (
      <Revision
        revision={revision}
        key={revision._id}
        isInitial={this.len - 1 === index}
      />
    );
  }

  renderCurrent (current) {
    return (
      <Revision
        revision={{
          user: current.updatedBy,
          date: current.updatedDate
        }}
        current
        isInitial={!this.len}
        key='current'
      />
    );
  }
}
