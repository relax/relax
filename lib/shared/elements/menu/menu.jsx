import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import classes from './classes';
import Entry from './entry';

export default class Menu extends Component {
  static propTypes = {
    menuData: PropTypes.object,
    styleClassMap: PropTypes.object,
    editing: PropTypes.bool.isRequired
  };

  static defaultProps = {
    styleClassMap: {},
    editing: false
  };

  init () {
    this.renderEntryRoot = this.renderEntry.bind(this, false);
    this.renderEntrySub = this.renderEntry.bind(this, true);
  }

  render () {
    const {menuData, editing} = this.props;
    let result = null;

    if (menuData) {
      result = this.renderMenu();
    } else if (editing) {
      result = this.renderEmpty();
    }

    return result;
  }

  renderMenu () {
    const {menuData, styleClassMap} = this.props;

    return (
      <ul className={cx(classes.menu, styleClassMap.menu)}>
        {
          menuData.root &&
          menuData.root.children &&
          menuData.root.children.map(this.renderEntryRoot)
        }
      </ul>
    );
  }

  renderEntry (sub, entryId) {
    const {menuData, styleClassMap, editing} = this.props;
    const entry = menuData[entryId];
    let children;

    if (entry.children) {
      children = entry.children.map(this.renderEntrySub);
    }

    return (
      <Entry
        entry={entry}
        subitem={sub}
        styleClassMap={styleClassMap}
        classes={classes}
        editing={editing}
        key={entry.id}
      >
        {children}
      </Entry>
    );
  }

  renderEmpty () {
    return (
      <div>Choose a menu on settings</div>
    );
  }
}
