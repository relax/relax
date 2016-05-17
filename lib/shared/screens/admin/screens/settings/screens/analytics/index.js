import Component from 'components/component';
import React from 'react';

import AnalyticsSettings from './components/analytics';

const options = [
  {
    label: 'Google analytics tracking ID',
    type: 'String',
    id: 'googleAnalytics',
    props: {
      placeholder: 'UA-XXXXX-Y'
    }
  }
];

export default class AnalyticsSettingsContainer extends Component {
  static propTypes = {};

  render () {
    return (
      <AnalyticsSettings options={options} />
    );
  }
}
