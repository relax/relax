import bind from 'decorators/debounce';
import debounce from 'decorators/debounce';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {pushState} from 'react-router';
import {dataConnect} from 'relate-js';

import Users from './components/users.jsx';

@dataConnect(
  () => ({
    fragments: Users.fragments
  })
)
export default class UsersContainer extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired
  };

  static defaultProps = {
    users: []
  };

  getInitState () {
    return {
      newOpened: false
    };
  }

  openNew () {
    this.setState({
      newOpened: true
    });
  }

  closeNew () {
    this.setState({
      newOpened: false
    });
  }

  @bind
  searchChange (search) {
    this.setState({
      search
    });
    this.updateSearch();
  }

  @debounce(300)
  updateSearch () {
    const {location} = this.props;
    const query = Object.assign({}, location.query, {
      s: this.state.search
    });
    this.context.store.dispatch(pushState(null, location, query));
  }

  render () {
    const {users} = this.props;
    return (
      <Users
        users={users}
        {...this.state}
        openNew={::this.openNew}
        closeNew={::this.closeNew}
      />
    );
  }
}
