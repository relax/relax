import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './entry.less';

export default class Breadcrumbs extends Component {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  };

  onClick () {
    const {onClick, entry} = this.props;
    onClick(entry.id);
  }

  render () {
    const {entry} = this.props;
    return (
      <span className={styles.root}>
        <button className={styles.button} onClick={::this.onClick}>
          {entry.label || entry.tag}
        </button>
        <span className={styles.sep}> > </span>
      </span>
    );
  }
}
