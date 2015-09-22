import React from 'react';
import SchemaLinking from './schema-linking';

import Canvas from './canvas';
import Chrome from './chrome';
import GeneralElementsMenu from './general-elements-menu';
import JSSReact from '../../react-jss/jss-react';
import factory from './factory';

class PageBuilder extends SchemaLinking {
  render () {
    return (
      <div>
        <JSSReact />
        <Canvas />
        <Chrome />
        <GeneralElementsMenu />
        {this.renderDraggingLine()}
        {this.renderPossibilities()}
      </div>
    );
  }
}

export default factory(PageBuilder);
