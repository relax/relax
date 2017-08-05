import Component from 'components/component';
import bind from 'decorators/bind';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import PropTypes from 'prop-types';

import Shadow from './shadow';
import styles from './index.less';

export default class BoxShadow extends Component {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    value: []
  };

  getInitState () {
    return {
      editingShadow: false
    };
  }

  @bind
  addNewClick () {
    this.props.onChange([...this.props.value, {
      type: 'outset',
      color: {
        value: '#000000'
      },
      spread: '2px',
      blur: '2px',
      x: '2px',
      y: '2px'
    }]);
    this.setState({
      editingShadow: this.props.value.length
    });
  }

  @bind
  changeShadow (key, value) {
    if (this.state.editingShadow !== false) {
      const newValue = cloneDeep(this.props.value);
      newValue[this.state.editingShadow][key] = value;
      this.props.onChange(newValue);
    }
  }

  @bind
  selectShadow (index) {
    if (this.state.editingShadow === index) {
      this.setState({
        editingShadow: false
      });
    } else {
      this.setState({
        editingShadow: index
      });
    }
  }

  @bind
  removeShadow (index) {
    const newValue = cloneDeep(this.props.value);
    newValue.splice(index, 1);
    this.props.onChange(newValue);
  }

  render () {
    return (
      <div>
        {this.props.value.map(this.renderEntry, this)}
        <div className={styles.addButton} onClick={this.addNewClick}>
          Add new shadow
        </div>
      </div>
    );
  }

  renderEntry (shadow, index) {
    return (
      <Shadow
        key={index}
        index={index}
        editing={this.state.editingShadow === index}
        shadow={shadow}
        changeShadow={this.changeShadow}
        selectShadow={this.selectShadow}
        removeShadow={this.removeShadow}
        {...this.props}
      />
    );
  }
}
