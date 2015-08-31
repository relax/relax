import React from 'react';
import {Component} from 'relax-framework';
import Entry from './entry';

export default class List extends Component {
  renderEntry (page) {
    return (
      <Entry key={page._id} page={page} />
    );
  }

  render () {
    return (
      <div className='list'>
        {this.props.data.map(this.renderEntry, this)}
      </div>
    );
  }
}

List.propTypes = {
  data: React.PropTypes.array.isRequired
};
