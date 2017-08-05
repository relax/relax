import cx from 'classnames';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './breadcrumbs.less';
import Entry from './entry';

export default class Breadcrumbs extends Component {
  static propTypes = {
    selectElement: PropTypes.func.isRequired,
    selectedPath: PropTypes.array.isRequired,
    selectedElement: PropTypes.object,
    className: PropTypes.string,
    context: PropTypes.object
  };

  render () {
    const {selectedPath, selectedElement, className} = this.props;
    return (
      <div className={cx(styles.root, className)}>
        <span
          className={styles.current}
          key='current'
        >
          {(selectedElement && (selectedElement.label || selectedElement.tag)) || 'Body'}
        </span>
        {selectedPath && selectedPath.slice(0).reverse().map(this.renderEntry, this)}
      </div>
    );
  }

  renderEntry (entry) {
    const {selectElement, context} = this.props;
    return (
      <Entry
        key={entry.id}
        entry={entry}
        onClick={selectElement}
        context={context}
      />
    );
  }
}
