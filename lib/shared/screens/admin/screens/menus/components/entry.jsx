import cx from 'classnames';
import moment from 'moment';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import styles from './entry.less';

export default class MenuEntry extends Component {
  static fragments = {
    menu: {
      _id: 1,
      title: 1,
      date: 1
    }
  };

  static propTypes = {
    menu: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    query: PropTypes.object.isRequired
  };

  render () {
    const {menu, active, query} = this.props;
    const date = moment(menu.date).fromNow();
    const editLink = '/admin/menus/' + menu._id;

    return (
      <Link to={editLink} query={query} className={cx(styles.root, active && styles.active)}>
        <div className={styles.title}>{menu.title}</div>
        <div className={styles.date}>{date}</div>
      </Link>
    );
  }
}
