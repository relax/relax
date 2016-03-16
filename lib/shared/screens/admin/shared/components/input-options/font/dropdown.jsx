import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './dropdown.less';

export default class Dropdown extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    entries: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    tempChange: PropTypes.func.isRequired,
    tempRevert: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  getInitState () {
    return {
      opened: false
    };
  }

  onEntryClick (value, event) {
    event.preventDefault();
    this.props.onChange(value);
  }

  toggle () {
    this.setState({
      opened: !this.state.opened
    });
  }

  render () {
    const {className, label} = this.props;
    return (
      <div className={cx(styles.root, className)} onClick={::this.toggle}>
        {this.renderCollapsable()}
        <span className={styles.info}>
          {label}
          <i className='nc-icon-mini arrows-1_small-triangle-down'></i>
        </span>
      </div>
    );
  }

  renderCollapsable () {
    if (this.state.opened) {
      return (
        <div className={styles.collapsable}>
          {this.props.entries.map(this.renderEntry, this)}
        </div>
      );
    }
  }

  renderEntry (entry) {
    const onClick = this.onEntryClick.bind(this, entry.value);
    return (
      <button
        className={styles.entry}
        onClick={onClick}
      >
        {entry.label}
      </button>
    );
  }
}
