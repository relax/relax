import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {dataConnect} from 'relate-js';

import Menu from './menu';
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
export default class MobileMenuElementContainer extends Component {
  static propTypes = {
    menuId: PropTypes.string,
    relax: PropTypes.object.isRequired,
    styleClassMap: PropTypes.object,
    Element: PropTypes.func.isRequired
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
    const {Element, relax, menu, styleClassMap, loading} = this.props;

    return (
      <Menu
        relax={relax}
        menuData={menu && menu.data}
        styleClassMap={styleClassMap}
        editing={relax.editing}
        loading={loading}
        Element={Element}
      />
    );
  }
}
