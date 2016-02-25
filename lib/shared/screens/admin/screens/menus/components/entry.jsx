import cx from 'classnames';
import moment from 'moment';
import A from 'components/a';
import Component from 'components/component';
import React, {PropTypes} from 'react';

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
    active: PropTypes.bool.isRequired
  };

  render () {
    const {menu, active} = this.props;
    const date = moment(menu.date).fromNow();
    const editLink = '/admin/menus/' + menu._id;

    return (
      <A href={editLink} className={cx(styles.root, active && styles.active)}>
        <div className={styles.title}>{menu.title}</div>
        <div className={styles.date}>{date}</div>
      </A>
    );
  }
}
