import * as menusActions from '../../../client/actions/menus';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import Component from '../../component';
import Element from '../../element';
import Menu from './menu';

@connect(
  (state) => ({
    menus: state.menus.blocksRequested
  }),
  (dispatch) => bindActionCreators(menusActions, dispatch)
)
export default class MenuContainer extends Component {
  static propTypes = {
    menuId: PropTypes.string,
    menus: PropTypes.object.isRequired,
    pageBuilder: PropTypes.object,
    getMenu: PropTypes.func.isRequired,
    element: PropTypes.object.isRequired
  }

  static propsSchema = propsSchema
  static settings = settings
  static style = style

  componentWillMount (props = this.props) {
    this.props.getMenu(props.menuId, this.props.element.id);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.pageBuilder && this.props.pageBuilder.editing && nextProps.menuId !== this.props.menuId) {
      this.getInitialState(nextProps);
    }
  }

  render () {
    return (
      <Element htmlTag='div' settings={settings} info={this.props}>
        <Menu {...this.props} menu={this.props.menus[this.props.element.id]} />
      </Element>
    );
  }
}
