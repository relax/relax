import cx from 'classnames';
import Component from 'components/component';
import OptionsMenu from 'components/options-menu';
import React, {PropTypes} from 'react';

import styles from './entry.less';

export default class Entry extends Component {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    styleOptions: PropTypes.object.isRequired,
    removeStyle: PropTypes.func.isRequired,
    duplicateStyle: PropTypes.func.isRequired
  };

  getInitState () {
    return {
      options: false
    };
  }

  openOptions (event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      options: true
    });
  }

  onMouseLeave () {
    if (this.state.options) {
      this.setState({
        options: false
      });
    }
  }

  onClick (event) {
    event.preventDefault();
    this.props.onClick(this.props.entry._id);
  }

  duplicate () {
    this.props.duplicateStyle(this.props.entry);
  }

  remove () {
    this.props.removeStyle(this.props.entry._id);
  }

  render () {
    return (
      <div className={styles.root} onClick={::this.onClick} onMouseLeave={::this.onMouseLeave}>
        <div className={styles.holder}>
          <span className={cx(styles.column, styles.title)}>{this.props.entry.title}</span>
          {this.renderOptionsButton()}
          {this.renderInfo()}
        </div>
      </div>
    );
  }

  renderOptionsButton () {
    if (this.props.entry._id !== 'no_style') {
      return (
        <span className={cx(styles.column, styles.optionsButton)} onClick={::this.openOptions}>
          <i className={cx('nc-icon-mini ui-2_menu-dots', styles.icon)}></i>
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
            {label: 'Duplicate', action: ::this.duplicate, icon: 'nc-icon-mini files_single-copy-04'},
            {label: 'Remove', action: ::this.remove, icon: 'nc-icon-mini ui-1_trash'}
          ]}
        />
      );
    }
  }

  renderInfo () {
    const {styleOptions, entry} = this.props;
    if (styleOptions.getIdentifierLabel && entry._id !== 'no_style') {
      return (
        <span className={cx(styles.column, styles.info)}>
          {styleOptions.getIdentifierLabel(Object.assign({}, styleOptions.defaults, entry.options))}
        </span>
      );
    }
  }
}
