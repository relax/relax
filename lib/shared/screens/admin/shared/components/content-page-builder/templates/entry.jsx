import cx from 'classnames';
import moment from 'moment';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './entry.less';

export default class TemplatesEntry extends Component {
  static fragments = {
    template: {
      _id: 1,
      title: 1,
      date: 1,
      hasContent: 1
    }
  };

  static propTypes = {
    template: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired
  };

  render () {
    const {template, active} = this.props;
    const date = moment(template.date).fromNow();

    return (
      <div className={cx(styles.root, active && styles.active, !template.hasContent && styles.disabled)}>
        <div className={cx(styles.status, template.hasContent && styles.hasContent)} />
        <div className={styles.info}>
          <div className={styles.title}>{template.title}</div>
          <div className={styles.date}>{!template.hasContent ? 'No content area defined' : date}</div>
        </div>
      </div>
    );
  }
}
