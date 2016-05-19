import Component from 'components/component';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './index.less';
import Revision from './revision';

export default class Revisions extends Component {
  static fragments = {
    revisions: Revision.fragments.revision
  };

  static propTypes = {
    revisions: PropTypes.array,
    current: PropTypes.object,
    restore: PropTypes.func.isRequired
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
    const {restore} = this.props;
    return (
      <Revision
        revision={revision}
        key={revision._id}
        isInitial={this.len - 1 === index}
        restore={restore}
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
        key={`current${this.len}`}
      />
    );
  }
}
