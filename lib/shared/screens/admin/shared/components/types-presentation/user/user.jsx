import React from 'react';
import PropTypes from 'prop-types';

import Component from 'components/component';
import Spinner from 'components/spinner';
import getGravatarImage from 'helpers/get-gravatar-image';
import styles from './user.less';

export default class User extends Component {
  static fragments = {
    user: {
      _id: 1,
      name: 1,
      username: 1,
      email: 1
    }
  };

  static propTypes = {
    user: PropTypes.object,
    userId: PropTypes.string,
    loading: PropTypes.bool
  };

  render () {
    const {user, loading, userId} = this.props;
    let result;

    if (!userId) {
      result = this.renderUnselected();
    } else if (loading) {
      result = this.renderLoading();
    } else if (user) {
      result = this.renderUser();
    } else {
      result = this.renderError();
    }

    return result;
  }

  renderLoading () {
    return (
      <Spinner />
    );
  }

  renderError () {
    return (
      <div>User not found</div>
    );
  }

  renderUnselected () {
    return (
      <div>None selected</div>
    );
  }

  renderUser () {
    const {user} = this.props;
    const url = getGravatarImage(user.email, 30);

    return (
      <div className={styles.root}>
        <div className={styles.image}>
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
