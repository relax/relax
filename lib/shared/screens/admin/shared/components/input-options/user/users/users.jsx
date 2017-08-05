import Component from 'components/component';
import Portal from 'components/portal';
import Scrollable from 'components/scrollable';
import Spinner from 'components/spinner';
import Stick from 'components/stick';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './users.less';
import User from './user';

export default class UsersList extends Component {
  static fragments = {
    users: User.fragments.user
  };

  static propTypes = {
    users: PropTypes.array,
    loading: PropTypes.bool,
    element: PropTypes.any,
    selectedId: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    toggleOpened: PropTypes.func.isRequired
  };

  render () {
    const {loading, users, element, toggleOpened} = this.props;
    let result;

    if (loading) {
      result = this.renderLoading();
    } else if (!users || users.length === 0) {
      result = this.renderEmpty();
    } else {
      result = this.renderContent();
    }

    return (
      <Portal>
        <Stick
          element={element}
          className={styles.root}
          verticalOffset={5}
          verticalPosition='bottom'
          onClose={toggleOpened}
        >
          {result}
        </Stick>
      </Portal>
    );
  }

  renderLoading () {
    return (
      <div className={styles.loading}>
        <Spinner />
        <span>Loading users</span>
      </div>
    );
  }

  renderEmpty () {
    return (
      <div className={styles.empty}>No results to show</div>
    );
  }

  renderContent () {
    const {users} = this.props;

    return (
      <Scrollable>
        {users.map(this.renderUser, this)}
      </Scrollable>
    );
  }

  renderUser (user) {
    const {selectedId, onChange} = this.props;
    return (
      <User
        user={user}
        selected={selectedId === user._id}
        onClick={onChange}
        key={user._id}
      />
    );
  }
}
