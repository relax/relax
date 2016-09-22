import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import Scrollable from 'components/scrollable';
import styles from './dropdown.less';
import bind from 'decorators/bind';
import utils from 'helpers/utils';

export default class Dropdown extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    entries: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    tempChange: PropTypes.func.isRequired,
    tempRevert: PropTypes.func.isRequired,
    className: PropTypes.string,
    fvd: PropTypes.bool,
    family: PropTypes.bool
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

  @bind
  toggle () {
    this.setState({
      opened: !this.state.opened
    });
  }

  render () {
    const {className, label, value, fvd, family} = this.props;
    const {opened} = this.state;
    const style = {};

    if (value) {
      if (fvd) {
        utils.processFVD(style, value);
      } else if (family) {
        style.fontFamily = value;
      }
    }

    return (
      <div className={cx(styles.root, opened && styles.opened, className)} onClick={this.toggle}>
        {this.renderCollapsable()}
        <span className={styles.info} style={style}>
          {label}
        </span>
        <i className='nc-icon-mini arrows-1_small-triangle-down' />
      </div>
    );
  }

  renderCollapsable () {
    if (this.state.opened) {
      return (
        <div className={styles.collapsable}>
          <Scrollable>
            <div>
              {this.props.entries.map(this.renderEntry, this)}
            </div>
          </Scrollable>
        </div>
      );
    }
  }

  renderEntry (entry) {
    const {fvd, family} = this.props;
    const onClick = this.onEntryClick.bind(this, entry.value);
    const style = {};

    if (fvd) {
      utils.processFVD(style, entry.value);
    } else if (family) {
      style.fontFamily = entry.value;
    }

    return (
      <button
        className={styles.entry}
        onClick={onClick}
        style={style}
      >
        {entry.label}
      </button>
    );
  }
}
