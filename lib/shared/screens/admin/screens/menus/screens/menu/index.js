import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {removeMenu, updateMenuTitle, updateMenuData} from 'actions/menu';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Menu from './components/menu';

@dataConnect(
  (state) => ({
    params: state.router.params
  }),
  (dispatch) => bindActionCreators({removeMenu, updateMenuTitle, updateMenuData}, dispatch),
  (props) => ({
    fragments: Menu.fragments,
    variablesTypes: {
      menu: {
        _id: 'ID!'
      }
    },
    initialVariables: {
      menu: {
        _id: props.params.id
      }
    }
  })
)
export default class MenuContainer extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired
  };

  static defaultProps = {
    menu: {}
  };

  getInitState () {
    return {
      deleteConfirm: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.props.relate.setVariables({
        menu: {
          _id: nextProps.params.id
        }
      });
    }
  }

  @bind
  onDelete () {
    this.setState({
      deleteConfirm: true
    });
  }

  @bind
  cancelDelete () {
    this.setState({
      deleteConfirm: false
    });
  }

  @bind
  confirmDelete () {
    const {params} = this.props;
    this.props.removeMenu(params.id, true);
  }

  @bind
  updateTitle (title) {
    const {menu} = this.props;
    return this.props.updateMenuTitle(menu._id, title);
  }

  @bind
  saveMenu () {
    const {menu} = this.props;
    return this.props.updateMenuData(menu._id);
  }

  render () {
    const {menu} = this.props;
    return (
      <Menu
        menu={menu}
        onDelete={this.onDelete}
        cancelDelete={this.cancelDelete}
        confirmDelete={this.confirmDelete}
        updateTitle={this.updateTitle}
        saveMenu={this.saveMenu}
        {...this.state}
      />
    );
  }
}
