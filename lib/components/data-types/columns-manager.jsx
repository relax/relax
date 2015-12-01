import cloneDeep from 'lodash.clonedeep';
import cx from 'classnames';
import React from 'react';
import {Component} from 'relax-framework';

import Utils from '../../utils';
import {Types} from '../../data-types';

export default class ColumnsManager extends Component {
  static columnOptions = [
    {
      label: 'Width',
      type: Types.Select,
      id: 'width',
      props: {
        labels: ['Block', 'Column auto', 'Column custom'],
        values: ['block', 'auto', 'custom']
      },
      unlocks: {
        custom: [
          {
            label: 'Width (%)',
            type: Types.Percentage,
            id: 'widthPerc'
          }
        ]
      }
    }
  ]
  static columnOptionsSingleRow = [
    {
      label: 'Width',
      type: Types.Select,
      id: 'width',
      props: {
        labels: ['Column auto', 'Column custom'],
        values: ['auto', 'custom']
      },
      unlocks: {
        custom: [
          {
            label: 'Width (%)',
            type: Types.Percentage,
            id: 'widthPerc'
          }
        ]
      }
    }
  ]
  static breakOptions = [
    {
      label: 'To next line',
      type: Types.Boolean,
      id: 'break',
      default: false
    }
  ]
  static propTypes = {
    value: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
    OptionsList: React.PropTypes.any.isRequired,
    multiRows: React.PropTypes.bool,
    pageBuilder: React.PropTypes.any.isRequired
  }
  static defaultProps = {
    multiRows: true
  }

  getInitState () {
    return {
      selected: false
    };
  }

  parseValue (value, idChanged = -1) {
    return Utils.parseColumnsDisplay(value, this.props.pageBuilder.selectedElement.children.length, this.props.multiRows, idChanged);
  }

  onClick (key, event) {
    event.preventDefault();

    if (this.state.selected === key) {
      this.setState({
        selected: false
      });
    } else {
      this.setState({
        selected: key
      });
    }
  }

  onChange (id, value) {
    const valueParsed = cloneDeep(this.parseValue(this.props.value));
    valueParsed[this.state.selected][id] = value;
    const result = this.parseValue(valueParsed, this.state.selected);
    this.props.onChange(result);
  }

  render () {
    return (
      <div className='columns-manager'>
        {this.renderChildren()}
        {this.renderOptions()}
      </div>
    );
  }

  renderChildren () {
    const value = this.parseValue(this.props.value);
    const children = [];
    const numChildren = this.props.pageBuilder.selectedElement.children.length;
    let i;

    for (i = 0; i < numChildren; i++) {
      if (value[i].width === 'block') {
        children.push(this.renderColumn(i, value[i]));
      } else {
        const columns = [];
        for (i; i < numChildren; i++) {
          if (value[i].width !== 'block' && !(columns.length > 0 && value[i].break)) {
            columns.push(this.renderColumn(i, value[i]));
          } else {
            i--;
            break;
          }
        }
        children.push(
          <div className='row' key={i}>
            {columns}
          </div>
        );
      }
    }

    return children;
  }

  renderColumn (id, value) {
    const style = {};

    if (value.width === 'custom') {
      style.width = value.widthPerc + '%';
    }

    return (
      <div style={style} className={cx('column', this.state.selected === id && 'active')} onClick={this.onClick.bind(this, id)} key={id}></div>
    );
  }

  renderOptions () {
    if (this.state.selected !== false) {
      const value = this.parseValue(this.props.value);
      const values = value[this.state.selected];
      const breakable = (
        this.props.multiRows &&
        values.width !== 'block' &&
        this.state.selected >= 2 &&
        this.state.selected < value.length - 1 &&
        value[this.state.selected - 1].width !== 'block' &&
        value[this.state.selected - 2].width !== 'block'
      );

      return (
        <div className='columns-manager-options'>
          <this.props.OptionsList options={this.props.multiRows ? this.constructor.columnOptions : this.constructor.columnOptionsSingleRow} values={values} onChange={this.onChange.bind(this)} />
          {breakable && <this.props.OptionsList options={this.constructor.breakOptions} values={values} onChange={this.onChange.bind(this)} />}
        </div>
      );
    }
  }
}
