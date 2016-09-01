import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './entry.less';

export default class Breadcrumbs extends Component {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    context: PropTypes.string
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
        <button className={styles.button} onClick={this.onClick}>
          {entry.label || entry.tag}
        </button>
        <span className={styles.sep}> > </span>
      </span>
    );
  }
}
