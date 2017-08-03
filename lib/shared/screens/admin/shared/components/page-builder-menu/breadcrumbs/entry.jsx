import bind from 'decorators/bind';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './entry.less';

export default class Breadcrumbs extends Component {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    context: PropTypes.object
  };

  @bind
  onClick () {
    const {onClick, entry, context} = this.props;
    onClick(entry.id, context);
  }

  render () {
    const {entry} = this.props;
    return (
      <span className={styles.root}>
        <span className={styles.sep}>{' < '}</span>
        <button className={styles.button} onClick={this.onClick}>
          {entry.label || entry.tag}
        </button>
      </span>
    );
  }
}
