import cx from 'classnames';
import utils from 'helpers/utils';
import React, {PropTypes} from 'react';
import Component from 'components/component';

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
    const url = utils.getGravatarImage(email, 50);

    return (
      <div className={styles.root}>
        <div className={styles.thumbnail}>
          <div className={styles.blurred}>
            <img src={url} />
          </div>
          <div className={styles.image}>
            <img src={url} />
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
