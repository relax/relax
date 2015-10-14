import React from 'react';
import {Component} from 'relax-framework';
import Entry from './entry';

export default class List extends Component {
  static fragments = {
    menus: Entry.fragments.menu
  }

  static propTypes = {
    menus: React.PropTypes.array,
    removeMenu: React.PropTypes.func,
    duplicateMenu: React.PropTypes.func
  }

  render () {
    return (
      <div className='list'>
        {this.renderEntries()}
      </div>
    );
  }

  renderEntries () {
    let result;
    if (this.props.menus.length > 0) {
      result = this.props.menus.map(this.renderEntry, this);
    } else {
      result = (
        <div className='none-warning'>
          <div className='none-icon-part'>
            <i className='material-icons'>error_outline</i>
          </div>
          <div className='none-info-part'>
            <p>No menus added yet!</p>
            <p>You can add new menus on the add new menu button above</p>
          </div>
        </div>
      );
    }
    return result;
  }

  renderEntry (menu) {
    return (
      <Entry
        key={menu._id}
        menu={menu}
        removeMenu={this.props.removeMenu}
        duplicateMenu={this.props.duplicateMenu}
      />
    );
  }
}
