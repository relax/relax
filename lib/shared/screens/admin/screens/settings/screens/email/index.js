import Component from 'components/component';
import React, {PropTypes} from 'react';

import EmailSettings from './components/email';

export default class EmailSettingsContainer extends Component {
  static propTypes = {};

  render () {
    return (
      <EmailSettings />
    );
  }
}
