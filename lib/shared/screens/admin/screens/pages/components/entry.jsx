import cx from 'classnames';
import moment from 'moment';
import A from 'components/a';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './entry.less';

export default class PagesEntry extends Component {
  static fragments = {
    page: {
      _id: 1,
      title: 1,
      state: 1,
      date: 1
    }
  };

  static propTypes = {
    page: PropTypes.object.isRequired
  };

  render () {
    const {page} = this.props;
    const date = moment(page.date).fromNow();
    const editLink = '/admin/pages/' + page._id;

    return (
      <A href={editLink} className={styles.root}>
        <div className={cx(styles.status, page.state === 'published' && styles.published)}></div>
        <div className={styles.info}>
          <div className={styles.title}>{page.title}</div>
          <div className={styles.date}>{date}</div>
        </div>
      </A>
    );
  }
}
