import Component from 'components/component';
import Content from 'components/content';
import ContentDisplays from 'components/content-displays';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentNew from 'components/content-new';
import ContentSearch from 'components/content-search';
import React, {PropTypes} from 'react';

import styles from './users.less';
import List from './list';

export default class Users extends Component {
  static fragments = List.fragments;

  static propTypes = {
    users: PropTypes.array.isRequired
  };

  render () {
    const {users} = this.props;

    return (
      <div className={styles.holder}>
        <ContentHeader>
          <ContentSearch value='' />
          <ContentHeaderActions>
            <ContentDisplays display='grid' />
            <ContentNew>Add new user</ContentNew>
          </ContentHeaderActions>
        </ContentHeader>
        <Content>
          <List users={users} />
        </Content>
      </div>
    );
  }
}
