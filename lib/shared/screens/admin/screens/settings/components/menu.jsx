import Button from 'components/menu-button';
import Component from 'components/component';
import ListHeader from 'components/list-header';
import Scrollable from 'components/scrollable';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './menu.less';

export default class SettingsMenu extends Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired
  };

  render () {
    const {onBack, pathname} = this.props;
    const seoPath = '/admin/settings/seo';
    return (
      <div>
        <ListHeader
          title='Settings'
          onBack={onBack}
        />
        <Scrollable className={styles.list}>
          <Button
            link='/admin/settings'
            label='General'
            icon='nc-icon-outline ui-1_preferences-circle-rotate'
            active={pathname === '/admin/settings'}
          />
          <Button
            link='/admin/settings/google'
            label='Google API'
            icon='nc-icon-outline ui-2_cloud-25'
            active={pathname === '/admin/settings/google'}
          />
          <Button
            link='/admin/settings/analytics'
            label='Analytics'
            icon='nc-icon-outline ui-1_analytics-88'
            active={pathname === '/admin/settings/analytics'}
          />
          <Button
            link={seoPath}
            label='SEO'
            icon='nc-icon-outline ui-1_zoom-split'
            active={pathname === seoPath}
          />
        </Scrollable>
      </div>
    );
  }
}
