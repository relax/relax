import Button from 'components/menu-button';
import Component from 'components/component';
import ListHeader from 'components/list-header';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './menu.less';

export default class SettingsMenu extends Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired
  };

  render () {
    const {onBack, pathname} = this.props;
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
            link='/admin/settings/email'
            label='Email'
            icon='nc-icon-outline ui-1_email-85'
            active={pathname === '/admin/settings/email'}
          />
          <Button
            link='/admin/settings/analytics'
            label='Analytics'
            icon='nc-icon-outline ui-1_analytics-88'
            active={pathname === '/admin/settings/analytics'}
          />
          <Button
            link='/admin/settings/data'
            label='Import/Export'
            icon='nc-icon-outline arrows-1_bold-direction'
            active={pathname === '/admin/settings/data'}
          />
        </Scrollable>
      </div>
    );
  }
}
