import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './breadcrumbs.less';
import Entry from './entry';

export default class Breadcrumbs extends Component {
  static propTypes = {
    selectElement: PropTypes.func.isRequired,
    selectedPath: PropTypes.array.isRequired,
    selectedElement: PropTypes.object,
    className: PropTypes.string
  };

  render () {
    const {selectedPath, selectedElement, className} = this.props;
    return (
      <div className={cx(styles.root, className)}>
        {selectedPath && selectedPath.map(this.renderEntry, this)}
        <span
          className={styles.current}
          key='current'
        >
          {(selectedElement && (selectedElement.label || selectedElement.tag)) || 'body'}
        </span>
      </div>
    );
  }

  renderEntry (entry) {
    const {selectElement} = this.props;
    return (
      <Entry key={entry.id} entry={entry} onClick={selectElement} />
    );
  }
}
