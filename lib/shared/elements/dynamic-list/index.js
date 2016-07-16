import React from 'react';

import propsSchema from './props-schema';
import settings from './settings';
import Component from '../component';

export default class DynamicListContainer extends Component {
  static propsSchema = propsSchema;
  static settings = settings;

  render () {
    return (
      <div></div>
    );
  }
}
