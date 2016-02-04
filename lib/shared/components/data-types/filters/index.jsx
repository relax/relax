import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Filter from './filter';

export default class Filters extends Component {
  static fragments = {
    schema: {
      _id: 1,
      title: 1,
      properties: 1
    }
  }

  static propTypes = {
    value: PropTypes.string.isRequired,
    openNew: PropTypes.func.isRequired,
    newOpened: PropTypes.bool.isRequired,
    schema: PropTypes.object.isRequired,
    editingFilter: PropTypes.object,
    editOpened: PropTypes.bool,
    editIndex: PropTypes.number
  }

  render () {
    return (
      <div className='filters'>
        {this.props.value.map(this.renderFilter, this)}
        {this.renderNew()}
        <div className='add-new' onClick={this.props.openNew}>Add new filter condition</div>
      </div>
    );
  }

  renderFilter (filter, index) {
    const editing = this.props.editOpened && this.props.editIndex === index;
    return (
      <Filter editing={editing} {...this.props} index={index} filter={editing ? this.props.editingFilter : filter} />
    );
  }

  renderNew () {
    if (this.props.newOpened) {
      return (
        <Filter editing new {...this.props} filter={this.props.editingFilter} />
      );
    }
  }
}
