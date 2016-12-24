import cx from 'classnames';
import Component from 'components/component';
import React from 'react';
import Scrollable from 'components/scrollable';

import styles from './builder.less';
import Collapsable from './collapsable';
import LinkBuilder from './link';
import Menu from './menu';
import Pages from './pages';

export default class MenuBuilder extends Component {
  render () {
    return (
      <div className={styles.root}>
        <div className={cx(styles.part, styles.left)}>
          <Scrollable className={styles.leftContent}>
            <div className={styles.innerScroll}>
              <Collapsable title='Pages' icon='nc-icon-outline design_window-paragraph'>
                <Pages />
              </Collapsable>
              <Collapsable title='Custom Link' icon='nc-icon-outline ui-2_link-72'>
                <LinkBuilder />
              </Collapsable>
            </div>
          </Scrollable>
        </div>
        <div className={cx(styles.part, styles.center)}>
          <i className={cx(styles.icon, 'nc-icon-outline arrows-1_tail-right')} />
        </div>
        <div className={cx(styles.part, styles.right)}>
          <Scrollable className={styles.rightContent}>
            <div className={styles.innerScroll}>
              <Menu />
            </div>
          </Scrollable>
        </div>
      </div>
    );
  }
}
