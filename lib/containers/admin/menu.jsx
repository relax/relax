import {Component} from 'relax-framework';
import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';
import React, {findDOMNode} from 'react';
import Velocity from 'velocity-animate';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as menuActions from '../../actions/menu';
import Menu from '../../components/admin/panels/menu';

@connect(
  (state) => ({
    pages: state.pages.data.items,
    menu: state.menu.data,
    errors: state.menu.errors
  }),
  (dispatch) => bindActionCreators(menuActions, dispatch)
)
export default class MenuContainer extends Component {
  static fragments = Menu.fragments

  static propTypes = {
    menu: React.PropTypes.object,
    user: React.PropTypes.object,
    errors: React.PropTypes.any,
    breadcrumbs: React.PropTypes.array,
    slug: React.PropTypes.string,
    changeMenuToDefault: React.PropTypes.func,
    addMenu: React.PropTypes.func,
    updateMenu: React.PropTypes.func,
    changeMenuFields: React.PropTypes.func
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

  async onSubmit (menuProps) {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }

    const submitMenu = cloneDeep(menuProps);

    let action;
    let routerOptions;

    if (this.isNew()) {
      submitMenu.createdBy = this.props.user._id;
      action = ::this.props.addMenu;
      routerOptions = {trigger: true};
    } else {
      submitMenu.createdBy = submitMenu.createdBy && submitMenu.createdBy._id;
      action = menuActions.update;
      action = ::this.props.updateMenu;
      routerOptions = {trigger: false, replace: true};
    }

    submitMenu.updatedBy = this.props.user._id;

    var hasErrors = false;
    try {
      await action(this.constructor.fragments, submitMenu);
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
      history.pushState({}, '', `/admin/menus/${submitMenu.slug}`);
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

    var dom = findDOMNode(this.refs.menu.refs.success);
    console.log(dom);
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
    this.props.changeMenuFields(merge({}, this.props.menu, values));
  }

  onDataChange (value) {
    this.props.changeMenuFields(merge({}, this.props.menu, {data: value}));
  }

  validateSlug (slug) {
    if (!this.isNew()) {
      if (this.props.menu.slug === slug) {
        return false;
      }
    }

    if (slug === 'new') {
      return true;
    }

    // return menuActions.validateSlug(slug);
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
