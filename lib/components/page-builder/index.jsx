import React from 'react';
import {Component} from 'relax-framework';

import Canvas from './canvas';
import Chrome from './chrome';
import GeneralElementsMenu from './general-elements-menu';
import JSSReact from '../../react-jss/jss-react';
import factory from './factory';

class PageBuilder extends Component {
  render () {
    return (
      <div>
        <JSSReact />
        <Canvas />
        <Chrome />
        <GeneralElementsMenu />
      </div>
    );
  }
}

export default factory(PageBuilder);
