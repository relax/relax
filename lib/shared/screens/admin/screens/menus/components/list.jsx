import Component from 'components/component';
import React, {PropTypes} from 'react';

import Entry from './entry';

export default class MenusList extends Component {
  static fragments = {
    menus: Entry.fragments.menu
  };

  static propTypes = {
    menus: PropTypes.array.isRequired,
    activeId: PropTypes.string,
    query: PropTypes.object.isRequired
  };

  render () {
    return (
      <div>
        {this.props.menus.map(this.renderEntry, this)}
      </div>
    );
  }

  renderEntry (menu, key) {
    const {activeId, query} = this.props;
    return (
      <Entry menu={menu} key={key} active={activeId === menu._id} query={query} />
    );
  }
}
