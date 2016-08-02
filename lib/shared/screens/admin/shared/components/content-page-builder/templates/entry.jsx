import bind from 'decorators/bind';
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
      links: 1
    }
  };

  static propTypes = {
    template: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string,
    itemId: PropTypes.string
  };

  @bind
  onClick () {
    const {onClick, template} = this.props;
    if (template.hasContent) {
      onClick(template._id);
    }
  }

  render () {
    const {template, active, type, itemId} = this.props;
    const date = moment(template.date).fromNow();
    const isLinked = template.links && (template.links[itemId] || template.links[type]);

    return (
      <div
        className={cx(styles.root, active && styles.active, !template.hasContent && styles.disabled)}
        onClick={this.onClick}
      >
        <div className={cx(styles.status, isLinked && styles.hasContent)} />
        <div className={styles.info}>
          <div className={styles.title}>{template.title}</div>
          <div className={styles.date}>{!template.hasContent ? 'No content area defined' : date}</div>
        </div>
      </div>
    );
  }
}
