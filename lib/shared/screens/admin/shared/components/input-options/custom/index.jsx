import React from 'react';
import PropTypes from 'prop-types';
import Component from 'components/component';
import styles from './index.less';
import Entry from './entry';
import bind from 'decorators/bind';

export default class CustomInputOption extends Component {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func.isRequired
  };

  @bind
  onPropertyChange (index, newProp) {
    const {value = [], onChange} = this.props;
    const newValue = value.slice(0);

    newValue.splice(index, 1, newProp);
    onChange(newValue);
  }

  @bind
  addProperty () {
    const {onChange, value = []} = this.props;
    const newValue = value.slice(0);

    newValue.push({
      property: '',
      value: ''
    });
    onChange(newValue);
  }

  @bind
  onRemove (index) {
    const {onChange, value = []} = this.props;
    const newValue = value.slice(0);

    newValue.splice(index, 1);
    onChange(newValue);
  }

  render () {
    const {value = []} = this.props;

    return (
      <div>
        <div>
          {value.map(this.renderProperty, this)}
        </div>
        <div className={styles.addButton} onClick={this.addProperty}>
          Add property
        </div>
      </div>
    );
  }

  renderProperty (prop, index) {
    return (
      <Entry
        key={index}
        index={index}
        property={prop.property}
        value={prop.value}
        onChange={this.onPropertyChange}
        onRemove={this.onRemove}
      />
    );
  }
}
