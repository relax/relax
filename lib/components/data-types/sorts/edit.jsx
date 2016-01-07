import find from 'lodash.find';
import forEach from 'lodash.foreach';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Combobox from '../combobox';

export default class Edit extends Component {
  static propTypes = {
    schema: PropTypes.object,
    sort: PropTypes.object.isRequired,
    new: PropTypes.bool,
    onPropertyChange: PropTypes.func.isRequired,
    onOrderChange: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    submitEdit: PropTypes.func.isRequired,
    schemaProperties: PropTypes.array.isRequired
  }

  render () {
    const {sort, schemaProperties} = this.props;
    const labels = [];
    const values = [];

    forEach(schemaProperties, (property) => {
      labels.push(property.title);
      values.push(property.id);
    });

    return (
      <div className='sort-picker-edit white-options'>
        <div className='sort-submit-wrapper'>
          <div className='sort-cancel' onClick={this.props.cancelEdit}>cancel</div>
          <div className='sort-submit' onClick={this.props.submitEdit}>{this.props.new ? 'Create new sort' : 'Ok'}</div>
        </div>
        <Combobox labels={labels} values={values} value={sort.prop} onChange={this.props.onPropertyChange} />
        {this.renderOptions()}
      </div>
    );
  }

  renderOptions () {
    let result;

    const {sort, schemaProperties} = this.props;
    const property = find(schemaProperties, 'id', sort.prop);

    if (property) {
      let labels = [];
      switch (property.type) {
        case 'Date':
          labels = ['Newest to oldest', 'Oldest to newest'];
          break;
        case 'Boolean':
          labels = ['Trues first', 'Falses first'];
          break;
        default:
          labels = ['Alphabetical order [A-Z]', 'Inverse alphabetical order [Z-A]'];
      }

      result = (
        <div className='sort-option' key='operation'>
          <div className='sort-label'>Order</div>
          <Combobox
            labels={labels}
            values={['ASC', 'DESC']}
            value={sort.order}
            onChange={this.props.onOrderChange}
          />
        </div>
      );
    } else {
      result = (
        <div className='sort-error'>
          Invalid sort
        </div>
      );
    }

    return result;
  }
}
