import React from 'react';
import {Component} from 'relax-framework';
import Entry from './entry';

export default class List extends Component {
  renderEntry (menu) {
    return (
      <Entry key={menu._id} menu={menu} />
    );
  }

  renderEntries () {
    if (this.props.data.length > 0) {
      return this.props.data.map(this.renderEntry, this);
    } else {
      return (
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
  }

  render () {
    return (
      <div className='list'>
        {this.renderEntries()}
      </div>
    );
  }
}

List.propTypes = {
  data: React.PropTypes.array.isRequired
};
