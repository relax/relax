import getGravatarImage from 'helpers/get-gravatar-image';
import moment from 'moment';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './revision.less';

export default class Revision extends Component {
  static fragments = {
    revision: {
      _id: 1,
      user: {
        _id: 1,
        name: 1,
        email: 1
      },
      date: 1
    }
  };

  static propTypes = {
    revision: PropTypes.object.isRequired,
    current: PropTypes.bool,
    isInitial: PropTypes.bool
  };

  render () {
    const {revision, isInitial} = this.props;
    const image = getGravatarImage(revision.user && revision.user.email || 'default', 40);
    const date = revision.date && moment(revision.date).fromNow();

    return (
      <div className={styles.root}>
        <div className={styles.imageHolder}>
          <div className={styles.imageCircle}>
            <img className={styles.image} src={image} role='presentation' />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            {`${isInitial ? 'Created' : 'Updated'} by ${revision.user && revision.user.name}`}
          </div>
          <div className={styles.sub}>{date}</div>
          {this.renderRevert()}
        </div>
      </div>
    );
  }

  renderRevert () {
    if (!this.props.current) {
      return (
        <button className={styles.revert}>
          <i className='nc-icon-mini arrows-1_back-80' />
        </button>
      );
    }
  }
}
