import bind from 'decorators/bind';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {dataConnect} from 'relate-js';

import UserPicker from './user';

@dataConnect(
  (props) => {
    let result = {};

    if (props.value) {
      result = {
        fragments: UserPicker.fragments,
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
export default class UserPickerContainer extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    white: PropTypes.bool
  };

  getInitState () {
    return {
      opened: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.props.relate.refresh(nextProps);
    }
  }

  @bind
  toggle () {
    this.setState({
      opened: !this.state.opened
    });
  }

  render () {
    const {user, loading, onChange, white} = this.props;
    return (
      <UserPicker
        user={user}
        loading={loading}
        white={white}
        toggleOpened={this.toggle}
        onChange={onChange}
        {...this.state}
      />
    );
  }
}
