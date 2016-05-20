import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './schema.less';
import New from './new';

export default class Schema extends Component {
  static propTypes = {
    children: PropTypes.node,
    count: PropTypes.number.isRequired,
    schemaId: PropTypes.string.isRequired
  };

  render () {
    let result;

    if (this.props.count === 0) {
      result = this.renderNoPages();
    } else if (this.props.children) {
      result = this.props.children;
    } else {
      result = this.renderEmpty();
    }

    return result;
  }

  renderEmpty () {
    return (
      <div className={styles.empty}>
        <i className='nc-icon-outline media-1_touch'></i>
        <div className={styles.emptyText}>Relax, select an entry first!</div>
      </div>
    );
  }

  renderNoPages () {
    const {schemaId} = this.props;
    return (
      <div className={styles.noEntries}>
        <div className={styles.noTitle}>Oh my!</div>
        <div className={styles.noText}>
          <span>You don’t have any entries yet!</span>
          <br />
          <span>Lets change that</span>
        </div>
        <New schemaId={schemaId} />
      </div>
    );
  }
}
