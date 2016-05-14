import cx from 'classnames';
import moment from 'moment';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import styles from './entry.less';

export default class TemplatesEntry extends Component {
  static fragments = {
    template: {
      _id: 1,
      title: 1,
      date: 1
    }
  };

  static propTypes = {
    template: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    query: PropTypes.object.isRequired
  };

  render () {
    const {template, active, query} = this.props;
    const date = moment(template.date).fromNow();
    const editLink = `/admin/templates/${template._id}`;

    return (
      <Link to={editLink} query={query} className={cx(styles.root, active && styles.active)}>
        <div className={styles.info}>
          <div className={styles.title}>{template.title}</div>
          <div className={styles.date}>{date}</div>
        </div>
      </Link>
    );
  }
}
