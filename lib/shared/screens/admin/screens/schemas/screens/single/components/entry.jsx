import cx from 'classnames';
import moment from 'moment';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import Tooltip from 'components/tooltip';

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
    schemaId: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    query: PropTypes.object.isRequired
  };

  render () {
    const {schemaId, schemaEntry, active, query} = this.props;
    const date = moment(schemaEntry.date).fromNow();
    const editLink = `/admin/schemas/single/${schemaId}/${schemaEntry._id}`;

    const buildQuery = Object.assign({}, query);
    buildQuery.form && delete buildQuery.form;
    const formQuery = Object.assign({}, query, {form: true});

    return (
      <div className={cx(styles.holder, active && styles.holderActive)}>
        <Link to={{pathname: editLink, query: buildQuery}} className={cx(styles.root, active && styles.active)}>
          <div className={cx(styles.status, schemaEntry.state === 'published' && styles.published)} />
          <div className={styles.info}>
            <div className={styles.title}>{schemaEntry.title}</div>
            <div className={styles.date}>{date}</div>
          </div>
        </Link>
        <Link to={{pathname: editLink, query: formQuery}} className={styles.formButton}>
          <Tooltip label='Form View' dark>
            <i className='nc-icon-outline ui-2_menu-square' />
          </Tooltip>
        </Link>
      </div>
    );
  }
}
