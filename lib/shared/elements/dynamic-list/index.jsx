import React from 'react';

import propsSchema from './props-schema';
import settings from './settings';
import Component from '../component';
import Container from './container';

export default class DynamicList extends Component {
  static defaultProps = {
    limit: 10,
    columns: 2,
    verticalGutter: '10px',
    horizontalGutter: '10px'
  };
  static propsSchema = propsSchema;
  static settings = settings;

  render () {
    return <Container {...this.props} />;
  }
}
