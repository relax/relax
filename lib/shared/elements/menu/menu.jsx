import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import classes from './classes';
import Entry from './entry';

export default class Menu extends Component {
  static propTypes = {
    menu: PropTypes.object,
    styleClassMap: PropTypes.object,
    pageBuilder: PropTypes.object
  }
  static defaultProps = {
    styleClassMap: {}
  }

  render () {
    const classMap = this.props.styleClassMap;
    let result;
    if (this.props.menu && this.props.menu.data) {
      result = (
        <ul className={cx(classes.menu, classMap.menu)}>
          {this.props.menu.data.map(this.renderEntry, this)}
        </ul>
      );
    } else if (this.context.editing) {
      result = (
        <div>Choose a menu on settings</div>
      );
    } else {
      result = <div></div>;
    }
    return result;
  }

  renderEntry (entry) {
    return (
      <Entry
        entry={entry}
        subitem={false}
        classMap={this.props.styleClassMap}
        classes={classes}
        key={entry.id}
        pageBuilder={this.props.pageBuilder}
      />
    );
  }
}
