import Component from 'components/component';
import React, {PropTypes} from 'react';

import Revision from './revision';

export default class Revisions extends Component {
  static fragments = {
    revisions: Revision.fragments.revision
  };

  static propTypes = {
    revisions: PropTypes.array
  };

  render () {
    const {revisions} = this.props;
    return (
      <div>
        <div>Revisions</div>
        <div>
          {revisions && revisions.map(this.renderRevision, this)}
        </div>
      </div>
    );
  }

  renderRevision (revision) {
    return (
      <Revision revision={revision} />
    );
  }
}
