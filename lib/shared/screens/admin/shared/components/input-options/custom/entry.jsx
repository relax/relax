import React from 'react';
import PropTypes from 'prop-types';
import Component from 'components/component';
import Input from 'components/input-options/input';
import bind from 'decorators/bind';
import styles from './entry.less';
import cx from 'classnames';

export default class CustomInputOptionEntry extends Component {
  static propTypes = {
    property: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
  };

  @bind
  onPropertyChange (property) {
    const {onChange, value, index} = this.props;
    onChange(index, {
      value,
      property
    });
  }

  @bind
  onValueChange (value) {
    const {onChange, property, index} = this.props;
    onChange(index, {
      value,
      property
    });
  }

  @bind
  onRemove () {
    const {onRemove, index} = this.props;
    onRemove(index);
  }

  render () {
    const {property, value} = this.props;

    return (
      <div className={styles.root}>
        <Input value={property} onChange={this.onPropertyChange} className={styles.input} />
        <span className={styles.sep}>:</span>
        <Input value={value} onChange={this.onValueChange} className={styles.input} />
        <i
          className={cx(
            styles.removeButton,
            'nc-icon-mini ui-1_trash-simple'
          )}
          onClick={this.onRemove}
        />
      </div>
    );
  }
}
