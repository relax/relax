import Component from 'components/component';
import React, {PropTypes} from 'react';

import AnalyticsSettings from './components/analytics';

export default class AnalyticsSettingsContainer extends Component {
  static propTypes = {};

  render () {
    return (
      <AnalyticsSettings />
    );
  }
}
