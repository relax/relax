import cx from 'classnames';
import getGravatarImage from 'helpers/get-gravatar-image';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './user.less';

export default class User extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  getInitState () {
    return {
      opened: false
    };
  }

  toggleOpened () {
    this.setState({
      opened: !this.state.opened
    });
  }

  render () {
    const {email, name} = this.props.user;
    const {opened} = this.state;
    const url = getGravatarImage(email, 50);

    return (
      <div className={styles.root}>
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
        <button className={styles.toggle} onClick={::this.toggleOpened}>
          <i className={cx('nc-icon-mini', opened ? 'arrows-1_minimal-up' : 'arrows-1_minimal-down')}></i>
        </button>
      </div>
    );
  }
}
