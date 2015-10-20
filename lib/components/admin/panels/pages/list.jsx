import React from 'react';
import {Component} from 'relax-framework';
import Entry from './entry';

export default class List extends Component {
  static fragments = {
    pages: Entry.fragments.page
  }

  static propTypes = {
    pages: React.PropTypes.array,
    removePage: React.PropTypes.func,
    duplicatePage: React.PropTypes.func
  }

  render () {
    return (
      <div className='list'>
        {this.renderEntries()}
      </div>
    );
  }

  renderEntry (page) {
    return (
      <Entry
        key={page._id}
        page={page}
        removePage={this.props.removePage}
        duplicatePage={this.props.duplicatePage}
      />
    );
  }

  renderEntries () {
    let result;

    if (this.props.pages && this.props.pages.length > 0) {
      result = this.props.pages.map(this.renderEntry, this);
    } else {
      result = (
        <div className='none-warning'>
          <div className='none-icon-part'>
            <i className='material-icons'>error_outline</i>
          </div>
          <div className='none-info-part'>
            <p>No pages added yet!</p>
            <p>You can add new pages on the add new page button above</p>
          </div>
        </div>
      );
    }

    return result;
  }
}
