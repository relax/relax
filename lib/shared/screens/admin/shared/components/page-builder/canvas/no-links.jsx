import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

import styles from './no-links.less';

export default class NoLinks extends Component {
  static propTypes = {
    templateId: PropTypes.string.isRequired
  };

  render () {
    const {templateId} = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.title}>Hold your horses!</div>
          <div className={styles.text}>Template you're using has no links for this content type yet!</div>
          <Link
            to={{
              pathname: `/admin/templates/${templateId}`,
              query: {build: 1}
            }}
            className={styles.link}
          >
            <i className='nc-icon-outline ui-2_share-bold' />
            <span>Go link it</span>
          </Link>
        </div>
      </div>
    );
  }
}
