import cx from 'classnames';
import React from 'react';
import {Component} from 'relax-framework';

import Utils from '../../utils';
import {Types} from '../../data-types';

export default class ColumnsManager extends Component {
  getInitialState () {
    return {
      selected: false
    };
  }

  parseValue (value, idChanged = -1) {
    return Utils.parseColumnsDisplay(value, this.context.selected.children.length, this.props.multiRows, idChanged);
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
    var valueParsed = this.parseValue(this.props.value);
    valueParsed[this.state.selected][id] = value;
    const result = this.parseValue(valueParsed, this.state.selected);
    this.props.onChange(result);
  }

  renderColumn (id, value) {
    var style = {};

    if (value.width === 'custom') {
      style.width = value.widthPerc+'%';
    }

    return (
      <div style={style} className={cx('column', this.state.selected === id && 'active')} onClick={this.onClick.bind(this, id)} key={id}></div>
    );
  }

  renderChildren () {
    var value = this.parseValue(this.props.value);
    var children = [], i, numChildren = this.context.selected.children.length;

    for (i = 0; i < numChildren; i++) {
      if (value[i].width === 'block') {
        children.push(this.renderColumn(i, value[i]));
      } else {
        var columns = [];
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

  renderOptions () {
    if (this.state.selected !== false) {
      var value = this.parseValue(this.props.value);
      var values = value[this.state.selected];
      var breakable = (
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

  render () {
    return (
      <div className='columns-manager'>
        {this.renderChildren()}
        {this.renderOptions()}
      </div>
    );
  }
}

ColumnsManager.columnOptions = [
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
];

ColumnsManager.columnOptionsSingleRow = [
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
];

ColumnsManager.breakOptions = [
  {
    label: 'To next line',
    type: Types.Boolean,
    id: 'break',
    default: false
  }
];

ColumnsManager.contextTypes = {
  selected: React.PropTypes.any.isRequired
};

ColumnsManager.propTypes = {
  value: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired,
  OptionsList: React.PropTypes.any.isRequired,
  multiRows: React.PropTypes.bool
};

ColumnsManager.defaultProps = {
  multiRows: true
};
