import * as dndActions from '../../client/actions/dnd';
import * as menuActions from '../../client/actions/menu';

import cloneDeep from 'lodash.clonedeep';
import Velocity from 'velocity-animate';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import Menu from '../../components/admin/panels/menu';

@connect(
  (state) => ({
    pages: state.pages.data.items,
    menu: state.menu.data,
    isSlugValid: state.menu.isSlugValid,
    errors: state.menu.errors,
    dnd: state.dnd
  }),
  (dispatch) => ({
    ...bindActionCreators(menuActions, dispatch),
    dndActions: bindActionCreators(dndActions, dispatch)
  })
)
export default class MenuContainer extends Component {
  static fragments = Menu.fragments

  static panelSettings = {
    activePanelType: 'menu',
    breadcrumbs: [
      {
        label: 'Menus',
        type: 'menus',
        link: '/admin/menus'
      }
    ]
  }

  static propTypes = {
    menu: PropTypes.object,
    user: PropTypes.object,
    errors: PropTypes.any,
    breadcrumbs: PropTypes.array,
    slug: PropTypes.string,
    changeMenuToDefault: PropTypes.func,
    addMenu: PropTypes.func,
    updateMenu: PropTypes.func,
    changeMenuFields: PropTypes.func,
    validateMenuSlug: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.slug !== 'new' && nextProps.slug === 'new') {
      this.props.changeMenuToDefault();
    }
  }

  componentWillUnmount () {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }
  }

  async onSubmit (menuProps) {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }

    const submitMenu = cloneDeep(menuProps);

    let action;
    const isNew = this.isNew();

    if (isNew) {
      submitMenu.createdBy = this.props.user._id;
      action = ::this.props.addMenu;
    } else {
      submitMenu.createdBy = submitMenu.createdBy && submitMenu.createdBy._id;
      action = menuActions.update;
      action = ::this.props.updateMenu;
    }

    submitMenu.updatedBy = this.props.user._id;

    let hasErrors = false;
    let resultMenu;
    try {
      resultMenu = await action(this.constructor.fragments, submitMenu);
    } catch (ex) {
      hasErrors = true;
      console.error(ex);
    }

    if (hasErrors === false) {
      this.setState({
        saving: false,
        success: true,
        error: false,
        new: false
      });
      if (isNew) {
        this.props.history.pushState({}, `/admin/menus/${resultMenu._id}`);
      }
      this.successTimeout = setTimeout(::this.onSuccessOut, 3000);
    } else {
      this.setState({
        saving: false,
        error: true
      });
    }
  }

  onSuccessOut () {
    clearTimeout(this.successTimeout);

    const dom = findDOMNode(this.refs.menu.refs.success);
    if (dom) {
      const transition = 'transition.slideDownOut';
      Velocity(dom, transition, {
        duration: 400,
        display: null
      }).then(() => {
        this.setState({
          success: false
        });
      });
    }
  }

  onUpdate () {
    this.setState({
      saving: true,
      savingLabel: 'Updating menu'
    });

    this.onSubmit(this.props.menu);
  }

  onCreate () {
    this.setState({
      saving: true,
      savingLabel: 'Creating menu'
    });

    this.onSubmit(cloneDeep(this.props.menu));
  }

  onChange (values) {
    this.props.changeMenuFields(Object.assign({}, this.props.menu, values));
  }

  onDataChange (value) {
    this.props.changeMenuFields(Object.assign({}, this.props.menu, {data: value}));
  }

  async validateSlug (slug) {
    const menuId = this.props.menu._id;
    return await this.props.validateMenuSlug({slug, menuId});
  }

  isNew () {
    return !this.props.menu._id;
  }

  render () {
    return (
      <Menu
        ref='menu'
        {...this.props}
        {...this.state}
        onChange={::this.onChange}
        onCreate={::this.onCreate}
        onDataChange={::this.onDataChange}
        onUpdate={::this.onUpdate}
        validateSlug={::this.validateSlug}
      />
    );
  }
}
