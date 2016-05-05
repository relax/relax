import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import classes from './classes';
import Entry from './entry';

export default class Menu extends Component {
  static propTypes = {
    menu: PropTypes.object,
    styleClassMap: PropTypes.object,
    editing: PropTypes.bool.isRequired
  };

  static defaultProps = {
    styleClassMap: {},
    editing: false
  };

  render () {
    const {menu, editing} = this.props;
    let result = null;

    if (menu && menu.data) {
      result = this.renderMenu(menu.data);
    } else if (editing) {
      result = this.renderEmpty();
    }

    return result;
  }

  renderMenu (data) {
    const {styleClassMap} = this.props;

    return (
      <ul className={cx(classes.menu, styleClassMap.menu)}>
        {/* data.map(this.renderEntry, this) */}
      </ul>
    );
  }

  renderEntry (entry) {
    const {styleClassMap, editing} = this.props;

    return (
      <Entry
        entry={entry}
        subitem={false}
        styleClassMap={styleClassMap}
        classes={classes}
        editing={editing}
        key={entry.id}
      />
    );
  }

  renderEmpty () {
    return (
      <div>Choose a menu on settings</div>
    );
  }
}
