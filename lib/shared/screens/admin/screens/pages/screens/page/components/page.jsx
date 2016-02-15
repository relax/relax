import Component from 'components/component';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import React, {PropTypes} from 'react';

import styles from './page.less';

export default class Page extends Component {
  static fragments = {
    page: {
      _id: 1,
      title: 1,
      slug: 1
    }
  };

  static propTypes = {
    page: PropTypes.object.isRequired
  };

  render () {
    const {page} = this.props;

    return (
      <div>
        <ContentHeader smallPadding>
          <div className={styles.info}>
            <div className={styles.title}>{page.title}</div>
            <div className={styles.slug}>/{page.slug}</div>
          </div>
          <ContentHeaderActions>
            <button className={styles.actionButton}>
              <i className='nc-icon-outline ui-2_time'></i>
            </button>
            <button className={styles.actionButton}>
              <i className='nc-icon-outline travel_info'></i>
            </button>
          </ContentHeaderActions>
        </ContentHeader>
        <div className={styles.content}>

        </div>
      </div>
    );
  }
}
