import bind from 'decorators/bind';
import cx from 'classnames';
import getGravatarImage from 'helpers/get-gravatar-image';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './entry.less';

export default class Entry extends Component {
  static fragments = {
    user: {
      _id: 1,
      name: 1,
      email: 1
    }
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  @bind
  onDeleteClick () {
    const {user, onDelete} = this.props;
    onDelete(user);
  }

  render () {
    const {user} = this.props;
    const url = getGravatarImage(user.email, 125);

    return (
      <div className={styles.root}>
        <div className={styles.user}>
          <img src={url} role='presentation' />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>{user.name}</div>
          <div className={styles.value}>{user.email}</div>
        </div>
        <div className={styles.actions}>
          <button className={cx(styles.button, styles.remove)} onClick={this.onDeleteClick}>Delete User</button>
        </div>
      </div>
    );
  }
}
