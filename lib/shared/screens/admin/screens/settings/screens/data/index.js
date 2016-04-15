import Component from 'components/component';
import React, {PropTypes} from 'react';

import DataSettings from './components/data';

export default class DataSettingsContainer extends Component {
  static propTypes = {};

  render () {
    return (
      <DataSettings />
    );
  }
}
