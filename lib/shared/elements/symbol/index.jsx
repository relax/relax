import React from 'react';

import propsSchema from './props-schema';
import settings from './settings';
import Component from '../component';
import Container from './container';

export default class Symbol extends Component {

  static propsSchema = propsSchema;
  static settings = settings;

  render () {
    return <Container {...this.props} />;
  }
}
