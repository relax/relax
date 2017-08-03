import Component from 'components/component';
import Portal from 'components/portal';
import Scrollable from 'components/scrollable';
import Stick from 'components/stick';
import bind from 'decorators/bind';
import cx from 'classnames';
import {processFVD} from 'helpers/utils';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './dropdown.less';

export default class Dropdown extends Component {
  static propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    entries: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
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
        processFVD(style, value);
      } else if (family) {
        style.fontFamily = value;
      }
    }

    return (
      <div
        className={cx(styles.root, opened && styles.opened, className)}
        onClick={this.toggle}
        ref={(ref) => {
          this.element = ref;
        }}
      >
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
      const {entries} = this.props;
      const style = {
        width: this.element.getBoundingClientRect().width
      };

      if (entries.length <= 7) {
        style.height = `${entries.length * 31 + 4}px`;
      }

      const content = (
        <div className={styles.collapsableContent}>
          {entries.map(this.renderEntry, this)}
        </div>
      );

      return (
        <Portal>
          <Stick
            element={this.element}
            verticalPosition='bottom'
            horizontalPosition='left'
            transition='slideDownIn'
            horizontalOffset={0}
            verticalOffset={-1}
            onClose={this.toggle}
          >
            <div className={styles.collapsable} style={style}>
              {
                entries.length <= 7 ?
                content :
                <Scrollable>
                  {content}
                </Scrollable>
              }
            </div>
          </Stick>
        </Portal>
      );
    }
  }

  renderEntry (entry, key) {
    const {fvd, family} = this.props;
    const onClick = this.onEntryClick.bind(this, entry.value);
    const style = {};

    if (fvd) {
      processFVD(style, entry.value);
    } else if (family) {
      style.fontFamily = entry.value;
    }

    return (
      <button
        key={key}
        className={styles.entry}
        onClick={onClick}
        style={style}
      >
        {entry.label}
      </button>
    );
  }
}
