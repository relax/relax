import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import User from './components';

@dataConnect(
  (state) => ({
    userId: state.router.params.id
  }),
  (props) => ({
    fragments: User.fragments,
    variablesTypes: {
      user: {
        id: 'ID!'
      }
    },
    initialVariables: {
      user: {
        id: props.userId
      }
    }
  })
)
export default class UserContainer extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired
  };

  render () {
    const {user} = this.props;

    return (
      <User user={user} />
    );
  }
}
