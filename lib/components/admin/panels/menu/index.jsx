import {Component, mergeFragments} from 'relax-framework';
import {Router} from 'backbone';
import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';
import React, {findDOMNode} from 'react';
import cx from 'classnames';
import moment from 'moment';
import Velocity from 'velocity-animate';
import Utils from '../../../../utils';

import A from '../../../a';
import Animate from '../../../animate';
import Spinner from '../../../spinner';
import Breadcrumbs from '../../../breadcrumbs';
import TitleSlug from '../../../title-slug';
import NotFound from '../not-found';
import Builder from './builder';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as menuActions from '../../../../actions/menu';

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

const menuUserFragment = {
  _id: 1,
  email: 1,
  name: 1
};

@connect(
  (state) => ({
    pages: state.pages.data.items,
    menu: state.menu.data,
    errors: state.menu.errors
  }),
  (dispatch) => bindActionCreators(menuActions, dispatch)
)
export default class Menu extends Component {
  static fragments = mergeFragments({
    menu: {
      _id: 1,
      title: 1,
      slug: 1,
      date: 1,
      updatedDate: 1,
      createdBy: {
        ...menuUserFragment
      },
      updatedBy: {
        ...menuUserFragment
      },
      data: {
        ...menuDataFragment,
        children: {
          ...menuDataFragment,
          children: {
            ...menuDataFragment
          }
        }
      }
    }
  }, Builder.fragments)

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

  onSubmit (menuProps) {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }

    const submitMenu = cloneDeep(menuProps);

    let action;
    let routerOptions;
    if (this.isNew()) {
      submitMenu.createdBy = this.props.user._id;
      action = this.props.addMenu;
      routerOptions = {trigger: true};
    } else {
      submitMenu.createdBy = submitMenu.createdBy && submitMenu.createdBy._id;
      action = menuActions.update;
      action = this.props.updateMenu;
      routerOptions = {trigger: false, replace: true};
    }

    submitMenu.updatedBy = this.props.user._id;

    action(this.constructor.fragments, submitMenu)
      .then((menu) => {
        this.setState({
          saving: false,
          menu,
          success: true,
          error: false,
          new: false
        });
        Router.prototype.navigate('/admin/menus/' + submitMenu.slug, routerOptions);
        this.successTimeout = setTimeout(this.successOut.bind(this), 3000);
      })
      .catch((error) => {
        this.setState({
          saving: false,
          error: true
        });
      });
  }

  successOut () {
    clearTimeout(this.successTimeout);

    var dom = findDOMNode(this.refs.success);

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
    return !this.props.menu._id && this.props.slug === 'new';
  }

  render () {
    const isNew = this.isNew();
    let result;

    if (!isNew && this.props.errors) {
      result = <NotFound />;
    } else {
      const createdDate = isNew ? 'Creating' : moment(this.props.menu.date).format('MMMM Do YYYY');
      const createdUser = isNew ? this.props.user : this.props.menu.createdBy;
      const updatedUser = isNew ? this.props.user : this.props.menu.updatedBy;

      const breadcrumbs = this.props.breadcrumbs.slice();
      breadcrumbs.push({
        label: this.props.menu.title
      });

      result = (
        <div className='admin-menu with-admin-sidebar'>
          <div className='content'>
            <div className='filter-menu'>
              <Breadcrumbs data={breadcrumbs} />
              {!isNew &&
              <A href='/admin/menus/new' className='button-clean'>
                <i className='material-icons'>library_add</i>
                <span>Add new menu</span>
              </A>}
            </div>
            <div className='admin-scrollable'>
              <div className='white-options list'>
                <TitleSlug
                  title={this.props.menu.title}
                  slug={this.props.menu.slug}
                  validateSlug={this.validateSlug.bind(this)}
                  onChange={this.onChange.bind(this)}
                />
                <Builder
                  data={this.props.menu.data}
                  pages={this.props.pages}
                  onChange={this.onDataChange.bind(this)}
                />
              </div>
            </div>
          </div>
          <div className='menu'>
            <div className='infos'>
              <div className={cx('info')}>
                <i className='material-icons'>menu</i>
                <span>Menu</span>
              </div>
              <div className={cx('info', isNew && 'alerted')}>
                <i className='material-icons'>today</i>
                <span>Created at</span>
                <div>{createdDate}</div>
              </div>
              <div className='info'>
                <span className='thumbnail'><img src={Utils.getGravatarImage(createdUser && createdUser.email || 'default', 40)} /></span>
                <span>Created by</span>
                <div>{createdUser && createdUser.name || 'removed user'}</div>
              </div>
              <div className='info'>
                <span className='thumbnail'><img src={Utils.getGravatarImage(updatedUser && updatedUser.email || 'default', 40)} /></span>
                <span>Last update by</span>
                <div>{updatedUser && updatedUser.name || 'removed user'}</div>
              </div>
            </div>
            {this.renderActions()}
            {this.renderSaving()}
          </div>
        </div>
      );
    }
    return result;
  }

  renderActions () {
    let result;
    if (!this.isNew()) {
      result = (
        <div className='actions'>
          <div className={cx('button button-primary', this.state.saving && 'disabled')} onClick={this.onUpdate.bind(this)}>Update</div>
        </div>
      );
    } else {
      result = (
        <div className='actions'>
          <div className={cx('button button-primary', this.state.saving && 'disabled')} onClick={this.onCreate.bind(this)}>Create</div>
        </div>
      );
    }
    return result;
  }

  renderSaving () {
    let result;
    if (this.state.saving) {
      result = (
        <Animate transition='slideDownIn' key='saving'>
          <div className='saving'>
            <Spinner />
            <span>{this.state.savingLabel}</span>
          </div>
        </Animate>
      );
    } else if (this.state.error) {
      result = (
        <Animate transition='slideDownIn' key='error'>
          <div className='error' ref='success'>
            <i className='material-icons'>error_outline</i>
            <span>Something went bad!</span>
          </div>
        </Animate>
      );
    } else if (this.state.success) {
      result = (
        <Animate transition='slideDownIn' key='success'>
          <div className='success' ref='success'>
            <i className='material-icons'>check</i>
            <span>All good!</span>
          </div>
        </Animate>
      );
    }
    return result;
  }
}
