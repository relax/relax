import cx from 'classnames';
import getGravatarImage from 'helpers/get-gravatar-image';
import Component from 'components/component';
import Spinner from 'components/spinner';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './user.less';
import Users from './users';

export default class UserPicker extends Component {
  static fragments = {
    user: {
      _id: 1,
      name: 1,
      email: 1
    }
  };

  static propTypes = {
    user: PropTypes.object,
    loading: PropTypes.bool,
    toggleOpened: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    opened: PropTypes.bool,
    white: PropTypes.bool
  };

  render () {
    const {white} = this.props;
    return (
      <div className={cx(white && styles.white)}>
        {this.renderCurrent()}
        {this.renderOpened()}
      </div>
    );
  }

  renderCurrent () {
    const {toggleOpened, opened} = this.props;
    return (
      <div className={styles.current} onClick={toggleOpened} ref='holder'>
        {this.renderPicture()}
        <i className={cx(
            styles.dropIcon,
            'nc-icon-mini',
            opened ? 'arrows-1_minimal-up' : 'arrows-1_minimal-down'
          )}
        />
        {this.renderName()}
      </div>
    );
  }

  renderPicture () {
    const {loading, user} = this.props;
    let result;

    if (loading) {
      result = (
        <Spinner />
      );
    } else if (user) {
      const url = getGravatarImage(user.email, 30);
      result = (
        <div className={styles.pictureImage}>
          <img src={url} role='presentation' />
        </div>
      );
    } else {
      result = (
        <i className='nc-icon-mini users_add-29' />
      );
    }

    return (
      <div className={styles.picture}>
        {result}
      </div>
    );
  }

  renderName () {
    const {loading, user} = this.props;
    let result;

    if (loading) {
      result = 'Loading';
    } else if (user) {
      result = (
        <div className={styles.name}>
          {user.name}
        </div>
      );
    } else {
      result = 'Select a user';
    }

    return (
      <div className={styles.info}>
        {result}
      </div>
    );
  }

  renderOpened () {
    if (this.props.opened) {
      const {user, onChange, toggleOpened} = this.props;
      return (
        <Users
          selectedUser={user}
          element={this.refs.holder}
          onChange={onChange}
          toggleOpened={toggleOpened}
        />
      );
    }
  }
}
