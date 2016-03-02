import cx from 'classnames';
import Component from 'components/component';
import Content from 'components/content';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import React, {PropTypes} from 'react';
import {mergeFragments} from 'relax-fragments';

import styles from './menu.less';
import MenuBuilder from './menu-builder';

export default class Menu extends Component {
  static fragments = mergeFragments({
    menu: {
      _id: 1,
      title: 1
    }
  });

  static propTypes = {
    menu: PropTypes.object.isRequired
  };

  render () {
    const {menu} = this.props;

    return (
      <div className={cx(this.state.build && styles.build)}>
        <ContentHeader>
          <div className={styles.title}>{menu.title}</div>
          <ContentHeaderActions>
            <button className={styles.actionButton}>
              Delete Menu
            </button>
          </ContentHeaderActions>
        </ContentHeader>
        <Content>
          <MenuBuilder />
        </Content>
      </div>
    );
  }
}
