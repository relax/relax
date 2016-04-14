import Component from 'components/component';
import React from 'react';
import {dataConnect} from 'relate-js';

import MenuBuilder from './builder';

export default class MenuBuilderContainer extends Component {
  render () {
    return (
      <MenuBuilder />
    );
  }
}
