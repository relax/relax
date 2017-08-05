import Component from 'components/component';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

export default class BorderStyle extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    value: 'solid'
  };

  onClick (type, event) {
    event.preventDefault();
    this.props.onChange(type);
  }

  render () {
    return (
      <div className={this.props.className}>
        {this.renderOption('solid')}
        {this.renderOption('dashed')}
        {this.renderOption('dotted')}
        {this.renderOption('double')}
      </div>
    );
  }

  renderOption (type) {
    const {value} = this.props;
    const onClick = this.onClick.bind(this, type);
    return (
      <div
        className={cx(styles.option, styles[type], value === type && styles.active)}
        onClick={onClick}
      />
    );
  }
}
