import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './family-button.less';

export default class FamilyButton extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired
  };

  @bind
  onClick () {
    const {onClick, id} = this.props;
    onClick(id);
  }

  render () {
    const {label, selected} = this.props;
    return (
      <div
        className={cx(styles.root, selected && styles.selected)}
        onClick={this.onClick}
      >
        {label}
      </div>
    );
  }
}
