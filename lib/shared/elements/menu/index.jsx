import React, {PropTypes} from 'react';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import Component from '../component';
import Element from '../element';
import MenuContainer from './container';

export default class MenuElement extends Component {
  static propTypes = {
    menuId: PropTypes.string,
    relax: PropTypes.object.isRequired,
    elements: PropTypes.object.isRequired,
    styleClassMap: PropTypes.object
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    const {relax, menuId, styleClassMap} = this.props;
    return (
      <Element htmlTag='div' settings={settings} {...relax}>
        <MenuContainer
          menuId={menuId}
          styleClassMap={styleClassMap}
          editing={relax.editing}
        />
      </Element>
    );
  }
}
