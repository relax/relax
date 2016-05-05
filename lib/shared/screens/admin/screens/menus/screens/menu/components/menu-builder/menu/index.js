import Component from 'components/component';
import React, {PropTypes} from 'react';
import {draggedMenuItem} from 'actions/menu';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Menu from './menu';

@dataConnect(
  (state) => ({
    menuId: state.router.params.id,
    dragging: state.dnd.dragging,
    menuData: state.menu,
    draggingId: state.dnd.dragInfo.id
  }),
  (dispatch) => bindActionCreators({draggedMenuItem}, dispatch),
  (props) => ({
    fragments: Menu.fragments,
    variablesTypes: {
      menu: {
        id: 'ID!'
      }
    },
    initialVariables: {
      menu: {
        id: props.menuId
      }
    }
  })
)
export default class MenuContainer extends Component {
  static propTypes = {
    menuId: PropTypes.string.isRequired
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.menuId !== nextProps.menuId) {
      this.props.relate.setVariables({
        menu: {
          id: nextProps.menuId
        }
      });
    }
  }

  render () {
    return (
      <Menu {...this.props} />
    );
  }
}
