import React, {PropTypes} from 'react';

import Component from '../component';
import Menu from './menu';
import {dataConnect} from 'relate-js';
import propsSchema from './props-schema';
import settings from './settings';
import style from './style';

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
    const {relax, menu, styleClassMap, loading} = this.props;

    return (
      <Menu
        relax={relax}
        menuData={menu && menu.data}
        styleClassMap={styleClassMap}
        editing={relax.editing}
        loading={loading}
      />
    );
  }
}
