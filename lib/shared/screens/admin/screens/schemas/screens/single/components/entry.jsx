import cx from 'classnames';
import moment from 'moment';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import styles from './entry.less';

export default class SchemaEntry extends Component {
  static fragments = {
    schemaEntry: {
      _id: 1,
      title: 1,
      state: 1,
      date: 1
    }
  };

  static propTypes = {
    schemaEntry: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    query: PropTypes.object.isRequired
  };

  render () {
    const {schemaEntry, active, query} = this.props;
    const date = moment(schemaEntry.date).fromNow();
    const editLink = '/admin/schemas/entry/' + schemaEntry._id; // TODO fix

    return (
      <Link to={editLink} query={query} className={cx(styles.root, active && styles.active)}>
        <div className={cx(styles.status, schemaEntry.state === 'published' && styles.published)}></div>
        <div className={styles.info}>
          <div className={styles.title}>{schemaEntry.title}</div>
          <div className={styles.date}>{date}</div>
        </div>
      </Link>
    );
  }
}
