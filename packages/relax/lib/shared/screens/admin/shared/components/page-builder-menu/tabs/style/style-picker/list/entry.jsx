import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import OptionsMenu from 'components/options-menu';
import React, {PropTypes} from 'react';

import styles from './entry.less';

export default class Entry extends Component {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    removeStyle: PropTypes.func.isRequired,
    duplicateStyle: PropTypes.func.isRequired
  };

  getInitState () {
    return {
      options: false
    };
  }

  @bind
  openOptions (event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      options: true
    });
  }

  @bind
  onMouseLeave () {
    if (this.state.options) {
      this.setState({
        options: false
      });
    }
  }

  @bind
  onClick (event) {
    const {onClick, entry} = this.props;

    event.preventDefault();
    onClick(entry._id);
  }

  @bind
  duplicate () {
    const {duplicateStyle, entry} = this.props;
    duplicateStyle(entry);
  }

  @bind
  remove () {
    const {removeStyle, entry} = this.props;
    removeStyle(entry._id);
  }

  render () {
    return (
      <div
        className={styles.root}
        onClick={this.onClick}
        onMouseLeave={this.onMouseLeave}
      >
        <div className={styles.holder}>
          <span className={cx(styles.column, styles.title)}>{this.props.entry.title}</span>
          {this.renderOptionsButton()}
        </div>
      </div>
    );
  }

  renderOptionsButton () {
    const {entry} = this.props;

    if (entry._id) {
      return (
        <span className={cx(styles.column, styles.optionsButton)} onClick={this.openOptions}>
          <i className={cx('nc-icon-mini ui-2_menu-dots', styles.icon)} />
          {this.renderOptionsMenu()}
        </span>
      );
    }
  }

  renderOptionsMenu () {
    if (this.state.options) {
      return (
        <OptionsMenu
          options={[
            {label: 'Duplicate', action: this.duplicate, icon: 'nc-icon-mini files_single-copy-04'},
            {label: 'Remove', action: this.remove, icon: 'nc-icon-mini ui-1_trash'}
          ]}
        />
      );
    }
  }
}
