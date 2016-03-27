import Component from 'components/component';
import React from 'react';

import Builder from './builder';

export default class SchemasBuilder extends Component {
  getInitState () {
    return {
      step: 0
    };
  }

  render () {
    const {step} = this.state;
    return (
      <Builder
        step={step}
      />
    );
  }
}
