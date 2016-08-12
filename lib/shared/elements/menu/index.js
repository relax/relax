import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import Component from '../component';
import Element from '../element';
import Menu from './menu';

@dataConnect(
  (props) => {
    const result = {
      variablesTypes: {
        menu: {
          id: 'ID!'
        }
      }
    };

    if (props.menuId) {
      result.fragments = {
        menu: {
          _id: 1,
          data: 1
        }
      };
      result.initialVariables = {
        menu: {
          id: props.menuId
        }
      };
    }

    return result;
  }
)
export default class MenuElement extends Component {
  static propTypes = {
    menuId: PropTypes.string,
    relax: PropTypes.object.isRequired,
    styleClassMap: PropTypes.object
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  componentWillReceiveProps (nextProps) {
    if (this.props.menuId !== nextProps.menuId && nextProps.menuId) {
      this.props.relate.refresh(nextProps);
    }
  }

  render () {
    const {relax, menu, styleClassMap} = this.props;
    return (
      <Element htmlTag='div' settings={settings} {...relax}>
        <Menu
          menuData={menu && menu.data}
          styleClassMap={styleClassMap}
          editing={relax.editing}
        />
      </Element>
    );
  }
}
