import * as elementsActions from 'actions/elements';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {buildQueryAndVariables} from 'relax-fragments';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import Component from '../component';
import Element from '../element';
import Menu from './menu';

const menuDataFragment = {
  id: 1,
  type: 1,
  page: {
    _id: 1,
    title: 1
  },
  link: {
    label: 1,
    url: 1
  }
};

@connect(
  (state) => ({
    elements: state.elements
  }),
  (dispatch) => bindActionCreators(elementsActions, dispatch)
)
export default class MenuContainer extends Component {
  static fragments = {
    menu: {
      data: {
        ...menuDataFragment,
        children: {
          ...menuDataFragment
        }
      }
    }
  };
  static propTypes = {
    menuId: PropTypes.string,
    relax: PropTypes.object.isRequired,
    elements: PropTypes.object.isRequired
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  getInitState () {
    this.fetchData(this.props);
    return {};
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.relax.editing && nextProps.menuId !== this.props.menuId) {
      this.fetchData(nextProps);
    }
  }

  fetchData (props) {
    if (props.menuId) {
      props.getElementData(props.elementId, buildQueryAndVariables(
        this.constructor.fragments,
        {
          menu: {
            _id: {
              value: props.menuId,
              type: 'ID!'
            }
          }
        }
      ));
    }
  }

  render () {
    const {elements, relax} = this.props;
    const menu = elements[relax.element.id] && elements[relax.element.id].menu;
    return (
      <Element htmlTag='div' settings={settings} {...this.props.relax}>
        <Menu {...this.props} menu={menu} />
      </Element>
    );
  }
}
