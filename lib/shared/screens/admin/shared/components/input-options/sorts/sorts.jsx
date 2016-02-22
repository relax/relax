import Component from 'components/component';
import React, {PropTypes} from 'react';

import Sort from './sort';

export default class Sorts extends Component {
  static fragments = {
    schema: {
      _id: 1,
      title: 1,
      properties: 1
    }
  };

  static propTypes = {
    value: PropTypes.string.isRequired,
    openNew: PropTypes.func.isRequired,
    newOpened: PropTypes.bool.isRequired,
    schema: PropTypes.object.isRequired,
    editingSort: PropTypes.object,
    editOpened: PropTypes.bool,
    editIndex: PropTypes.number
  };

  render () {
    return (
      <div className='sorts'>
        {this.props.value.map(this.renderSort, this)}
        {this.renderNew()}
        <div className='add-new' onClick={this.props.openNew}>Add new sort condition</div>
      </div>
    );
  }

  renderSort (sort, index) {
    const editing = this.props.editOpened && this.props.editIndex === index;
    return (
      <Sort editing={editing} {...this.props} index={index} sort={editing ? this.props.editingSort : sort} />
    );
  }

  renderNew () {
    if (this.props.newOpened) {
      return (
        <Sort editing new {...this.props} sort={this.props.editingSort} />
      );
    }
  }
}
