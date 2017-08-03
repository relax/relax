import bind from 'decorators/bind';
import cx from 'classnames';
import getGravatarImage from 'helpers/get-gravatar-image';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './user.less';

export default class UserEntry extends Component {
  static fragments = {
    user: {
      _id: 1,
      name: 1,
      email: 1,
      username: 1
    }
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired
  };

  @bind
  onClick () {
    const {onClick, user} = this.props;
    onClick(user._id);
  }

  render () {
    const {user, selected} = this.props;
    const url = getGravatarImage(user.email, 30);

    return (
      <div className={cx(styles.root, selected && styles.active)} onClick={this.onClick}>
        <div className={styles.pictureImage}>
          <img src={url} role='presentation' />
        </div>
        <div className={styles.info}>
          <div className={styles.name}>{user.name}</div>
          <div className={styles.username}>{user.username}</div>
        </div>
      </div>
    );
  }
}
