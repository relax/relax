import bind from 'decorators/bind';
import cloneDeep from 'lodash.clonedeep';
import utils from 'helpers/utils';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './columns-manager.less';
import Column from './column';

export default class ColumnsManager extends Component {
  static propTypes = {
    value: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    OptionsList: PropTypes.any.isRequired,
    multiRows: PropTypes.bool,
    selectedElement: PropTypes.object,
    columnOptions: PropTypes.array.isRequired,
    columnOptionsSingleRow: PropTypes.array.isRequired,
    breakOptions: PropTypes.array.isRequired
  };

  static defaultProps = {
    multiRows: true
  };

  getInitState () {
    return {
      selected: false
    };
  }

  parseValue (value, idChanged = -1) {
    const {selectedElement, multiRows} = this.props;
    return utils.parseColumnsDisplay(value, selectedElement.children.length, multiRows, idChanged);
  }

  @bind
  onClick (key) {
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
      <div>
        {this.renderChildren()}
        {this.renderOptions()}
      </div>
    );
  }

  renderChildren () {
    const {value, selectedElement} = this.props;
    const valueParsed = this.parseValue(value);
    const children = [];
    const numChildren = selectedElement.children.length;
    let i;

    for (i = 0; i < numChildren; i++) {
      if (valueParsed[i].width === 'block') {
        children.push(this.renderColumn(i, valueParsed[i]));
      } else {
        const columns = [];
        for (i; i < numChildren; i++) {
          if (valueParsed[i].width !== 'block' && !(columns.length > 0 && valueParsed[i].break)) {
            columns.push(this.renderColumn(i, valueParsed[i]));
          } else {
            i--;
            break;
          }
        }
        children.push(
          <div className={styles.row} key={i}>
            {columns}
          </div>
        );
      }
    }

    return children;
  }

  renderColumn (id, value) {
    return (
      <Column
        id={id}
        width={value.width}
        widthPerc={value.widthPerc}
        onClick={this.onClick}
        selected={this.state.selected === id}
        className={styles.column}
        key={id}
      />
    );
  }

  renderOptions () {
    if (this.state.selected !== false) {
      const {multiRows, OptionsList, columnOptions, columnOptionsSingleRow, breakOptions} = this.props;
      const value = this.parseValue(this.props.value);
      const values = value[this.state.selected];
      const breakable = (
        multiRows &&
        values.width !== 'block' &&
        this.state.selected >= 2 &&
        this.state.selected < value.length - 1 &&
        value[this.state.selected - 1].width !== 'block' &&
        value[this.state.selected - 2].width !== 'block'
      );

      return (
        <div className={styles.options}>
          <OptionsList
            options={multiRows ? columnOptions : columnOptionsSingleRow}
            values={values}
            onChange={::this.onChange}
          />
          {breakable && <OptionsList options={breakOptions} values={values} onChange={::this.onChange} />}
        </div>
      );
    }
  }
}
