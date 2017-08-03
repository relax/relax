import React from 'react';
import PropTypes from 'prop-types';

import Component from 'components/component';
import User from './user';
import {dataConnect} from 'relate-js';

@dataConnect(
  (props) => {
    let result = {};

    if (props.value) {
      result = {
        fragments: User.fragments,
        variablesTypes: {
          user: {
            id: 'ID!'
          }
        },
        initialVariables: {
          user: {
            id: props.value
          }
        }
      };
    }

    return result;
  }
)
export default class UserContainer extends Component {
  static propTypes = {
    user: PropTypes.object,
    loading: PropTypes.bool,
    value: PropTypes.string
  };

  render () {
    const {user, loading, value} = this.props;

    return (
      <User
        user={user}
        userId={value}
        loading={loading}
      />
    );
  }
}
