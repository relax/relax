import Component from 'components/component';
import Content from 'components/content';
import ContentDisplays from 'components/content-displays';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentNew from 'components/content-new';
import ContentSearch from 'components/content-search';
import Modal from 'components/modal';
import React, {PropTypes} from 'react';

import styles from './users.less';
import List from './list';
import New from './new';

export default class Users extends Component {
  static fragments = List.fragments;

  static propTypes = {
    users: PropTypes.array.isRequired,
    openNew: PropTypes.func.isRequired,
    newOpened: PropTypes.bool.isRequired,
    closeNew: PropTypes.func.isRequired
  };

  render () {
    const {users, openNew} = this.props;

    return (
      <div className={styles.holder}>
        <ContentHeader>
          <ContentSearch value='' />
          <ContentHeaderActions>
            <ContentDisplays display='grid' />
            <ContentNew onClick={openNew}>Add new user</ContentNew>
          </ContentHeaderActions>
        </ContentHeader>
        <Content>
          <List users={users} />
        </Content>
        {this.renderNew()}
      </div>
    );
  }

  renderNew () {
    const {newOpened, closeNew} = this.props;
    if (newOpened) {
      return (
        <Modal small subTitle='New User' title='Make the introductions!' onClose={closeNew}>
          <New fragments={Users.fragments} onClose={closeNew} />
        </Modal>
      );
    }
  }
}
