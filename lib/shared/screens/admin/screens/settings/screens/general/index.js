import Component from 'components/component';
import React, {PropTypes} from 'react';

import GeneralSettings from './components/general';

export default class GeneralSettingsContainer extends Component {
  static propTypes = {};

  render () {
    return (
      <GeneralSettings />
    );
  }
}
