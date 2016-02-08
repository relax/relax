import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Tabs from './tabs';

export default class TabsContainer extends Component {
  render () {
    return (
      <Tabs {...this.props} />
    );
  }
}
