import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {dataConnect} from 'relate-js';

import GoogleMap from './google-map';

@dataConnect(
  () => ({
    fragments: {
      setting: {
        _id: 1,
        value: 1
      }
    },
    variablesTypes: {
      setting: {
        id: 'String!'
      }
    },
    initialVariables: {
      setting: {
        id: 'googleAPI'
      }
    }
  })
)
export default class GoogleMapsContainer extends Component {
  static propTypes = {
    setting: PropTypes.object
  };

  render () {
    const {setting, ...props} = this.props;

    return (
      <GoogleMap
        {...props}
        googleAPI={setting && setting.value}
      />
    );
  }
}
