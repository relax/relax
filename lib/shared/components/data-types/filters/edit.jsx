import cx from 'classnames';
import find from 'lodash.find';
import forEach from 'lodash.foreach';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import getFilterDefaultOptions from '../../../helpers/schema-filter-default-options';
import Combobox from '../combobox';
import Input from '../input';
import NumberInput from '../number-input';

export default class Edit extends Component {
  static propTypes = {
    schema: PropTypes.object,
    filter: PropTypes.object.isRequired,
    new: PropTypes.bool,
    onPropertyChange: PropTypes.func.isRequired,
    onOptionChange: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    submitEdit: PropTypes.func.isRequired,
    schemaProperties: PropTypes.array.isRequired
  }

  onOptionChange (key, value) {
    this.props.onOptionChange(key, value);
  }

  render () {
    const {filter, schemaProperties} = this.props;
    const labels = [];
    const values = [];

    forEach(schemaProperties, (property) => {
      labels.push(property.title);
      values.push(property.id);
    });

    return (
      <div className='filter-picker-edit white-options'>
        <div className='filter-submit-wrapper'>
          <div className='filter-cancel' onClick={this.props.cancelEdit}>cancel</div>
          <div className='filter-submit' onClick={this.props.submitEdit}>{this.props.new ? 'Create new filter' : 'Ok'}</div>
        </div>
        <Combobox labels={labels} values={values} value={filter.prop} onChange={this.props.onPropertyChange} />
        {this.renderOptions()}
      </div>
    );
  }

  renderOptions () {
    let result;

    const {filter, schemaProperties} = this.props;
    const property = find(schemaProperties, 'id', filter.prop);

    if (property) {
      const options = Object.assign({}, getFilterDefaultOptions(property.type), filter.options);

      switch (property.type) {
        case 'Date':
          result = ([
            <div className='filter-option' key='operation'>
              <div className='filter-label'>From</div>
              <NumberInput className='micro inline-block' value={options.fromValue} onChange={this.onOptionChange.bind(this, 'fromValue')} />
              <Combobox
                className='small'
                labels={['Days', 'Weeks', 'Months']}
                values={['day', 'week', 'month']}
                value={options.fromGran}
                onChange={this.onOptionChange.bind(this, 'fromGran')}
                style={{
                  maxWidth: 126,
                  marginLeft: 10
                }}
              />
            </div>,
            <div className='filter-option' key='value'>
              <div className='filter-label'>To</div>
              {options.toGran !== 'present' && <NumberInput className='micro inline-block' value={options.toValue} onChange={this.onOptionChange.bind(this, 'toValue')} />}
              <Combobox
                className={cx(options.toGran !== 'present' && 'small')}
                labels={['Present', 'Days', 'Weeks', 'Months']}
                values={['present', 'day', 'week', 'month']}
                value={options.toGran}
                onChange={this.onOptionChange.bind(this, 'toGran')}
                style={options.toGran !== 'present' && {
                  maxWidth: 126,
                  marginLeft: 10
                } || {}}
              />
            </div>
          ]);
          break;
        case 'String':
          result = [
            <div className='filter-option' key='operation'>
              <div className='filter-label'>Operation</div>
              <Combobox
                labels={['Equal', 'Not equal', 'Is set', 'Is not set']}
                values={['equal', 'not-equal', 'set', 'not-set']}
                value={options.op}
                onChange={this.onOptionChange.bind(this, 'op')}
              />
            </div>
          ];
          if (options.op === 'equal' || options.op === 'not-equal') {
            result.push(
              <div className='filter-option' key='value'>
                <div className='filter-label'>Value</div>
                <Input
                  value={options.value}
                  onChange={this.onOptionChange.bind(this, 'value')}
                />
              </div>
            );
          }
          break;
        case 'Boolean':
          result = (
            <div className='filter-option'>
              <div className='filter-label'>Value</div>
              <Combobox
                labels={['True', 'False']}
                values={['true', 'false']}
                value={options.value}
                onChange={this.onOptionChange.bind(this, 'value')}
              />
            </div>
          );
          break;
        default:
          result = (
            <div className='filter-option'>
              <div className='filter-label'>Set</div>
              <Combobox
                labels={['Is set', 'Is not set']}
                values={['set', 'not-set']}
                value={options.op}
                onChange={this.onOptionChange.bind(this, 'op')}
              />
            </div>
          );
      }
    } else {
      result = (
        <div className='filter-error'>
          Invalid filter
        </div>
      );
    }

    return result;
  }
}
