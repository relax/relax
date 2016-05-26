import bind from 'decorators/bind';
import cx from 'classnames';
import getGravatarImage from 'helpers/get-gravatar-image';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import styles from './user.less';

export default class User extends Component {
  static fragments = {
    user: {
      _id: 1,
      email: 1,
      name: 1
    }
  };

  static propTypes = {
    user: PropTypes.object.isRequired
  };

  getInitState () {
    return {
      opened: false
    };
  }

  @bind
  toggleOpened () {
    this.setState({
      opened: !this.state.opened
    });
  }

  render () {
    const {_id, email, name} = this.props.user || {};
    const {opened} = this.state;
    const url = getGravatarImage(email, 50);

    return (
      <div className={cx(styles.root, opened && styles.opened)}>
        <div className={styles.head} onClick={this.toggleOpened}>
          <div className={styles.thumbnail}>
            <div className={styles.blurred}>
              <img src={url} role='presentation' />
            </div>
            <div className={styles.image}>
              <img src={url} role='presentation' />
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{name}</div>
            <div className={styles.role}>Administrator</div>
          </div>
          <div className={styles.toggle}>
            <i className={cx('nc-icon-mini', opened ? 'arrows-1_minimal-up' : 'arrows-1_minimal-down')}></i>
          </div>
        </div>
        <div className={styles.actions}>
          <Link to={`/admin/users/${_id}`} className={styles.action} onClick={this.toggleOpened}>
            <i className='nc-icon-mini users_circle-08'></i>
            <span>My Profile</span>
          </Link>
          <a href='https://github.com/relax/relax/issues' className={styles.action}>
            <i className='nc-icon-mini design_bug'></i>
            <span>Help</span>
          </a>
          <a href='/admin/logout' className={styles.action}>
            <i className='nc-icon-mini arrows-1_log-out'></i>
            <span>Logout</span>
          </a>
        </div>
      </div>
    );
  }
}
