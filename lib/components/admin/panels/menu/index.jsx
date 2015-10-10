import {Component, Router} from 'relax-framework';
import cloneDeep from 'lodash.clonedeep';
import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import Velocity from 'velocity-animate';
import Utils from '../../../../utils';

import A from '../../../a';
import Animate from '../../../animate';
import Spinner from '../../../spinner';
import Breadcrumbs from '../../../breadcrumbs';
import TitleSlug from '../../../title-slug';
import Builder from './builder';

import menuActions from '../../../../client/actions/menu';

export default class Menu extends Component {
  getInitialState () {
    let defaults = {
      title: 'New Menu',
      slug: 'new-menu',
      state: 'draft'
    };

    return {
      menu: cloneDeep(this.context.menu) || defaults,
      new: !(this.context.menu && this.context.menu._id),
      breadcrumbs: this.context.breadcrumbs
    };
  }

  componentDidUpdate () {
    if ((!this.state.new && !this.context.menu) ||
        (this.state.new && this.context.menu)) {
      this.setState(this.getInitialState());
    }
  }

  componentWillUnmount () {
    super.componentWillUnmount();
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }
  }

  onSubmit (data) {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }

    let action, routerOptions;
    if (this.state.new) {
      data.createdBy = this.context.user._id;
      action = menuActions.add;
      routerOptions = {trigger: true};
    } else {
      action = menuActions.update;
      routerOptions = {trigger: false, replace: true};
    }

    data.updatedBy = this.context.user._id;

    action(data)
      .then((menu) => {
        this.setState({
          saving: false,
          menu,
          success: true,
          error: false,
          new: false
        });
        Router.prototype.navigate('/admin/menus/'+menu.slug, routerOptions);
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

    var dom = this.refs.success;
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

  onUpdate () {
    this.setState({
      saving: true,
      savingLabel: 'Updating menu'
    });

    this.onSubmit(cloneDeep(this.state.menu));
  }

  onCreate () {
    this.setState({
      saving: true,
      savingLabel: 'Creating menu'
    });

    this.onSubmit(cloneDeep(this.state.menu));
  }

  onFieldChange (id, value) {
    this.state.menu[id] = value;

    this.setState({
      menu: this.state.menu
    });
  }

  onChange (values) {
    if (values.title) {
      this.state.breadcrumbs[1].label = values.title;
      this.state.menu.title = values.title;
    }
    if (values.slug) {
      this.state.menu.slug = values.slug;
    }

    this.setState({
      menu: this.state.menu,
      breadcrumbs: this.state.breadcrumbs
    });
  }

  onDataChange (value) {
    this.state.menu.data = value;
    this.setState({
      menu: this.state.menu
    });
  }

  validateSlug (slug) {
    if (!this.state.new) {
      if (this.context.menu.slug === slug) {
        return false;
      }
    }

    if (slug === 'new') {
      return true;
    }

    return menuActions.validateSlug(slug);
  }

  renderActions () {
    if (!this.state.new) {
      return (
        <div className='actions'>
          <div className={cx('button button-primary', this.state.saving && 'disabled')} onClick={this.onUpdate.bind(this)}>Update</div>
        </div>
      );
    } else {
      return (
        <div className='actions'>
          <div className={cx('button button-primary', this.state.saving && 'disabled')} onClick={this.onCreate.bind(this)}>Create</div>
        </div>
      );
    }
  }

  renderSaving () {
    if (this.state.saving) {
      return (
        <Animate transition='slideDownIn' key='saving'>
          <div className='saving'>
            <Spinner />
            <span>{this.state.savingLabel}</span>
          </div>
        </Animate>
      );
    } else if (this.state.error) {
      return (
        <Animate transition='slideDownIn'  key='error'>
          <div className='error' ref='success'>
            <i className='material-icons'>error_outline</i>
            <span>Something went bad!</span>
          </div>
        </Animate>
      );
    } else if (this.state.success) {
      return (
        <Animate transition='slideDownIn'  key='success'>
          <div className='success' ref='success'>
            <i className='material-icons'>check</i>
            <span>All good!</span>
          </div>
        </Animate>
      );
    }
  }

  render () {
    const createdDate = this.state.new ? 'Creating' : moment(this.state.menu.date).format('MMMM Do YYYY');
    const createdUser = this.state.new ? this.context.user : this.state.menu.createdBy;
    const updatedUser = this.state.new ? this.context.user : this.state.menu.updatedBy;

    return (
      <div className='admin-menu with-admin-sidebar'>
        <div className='content'>
          <div className='filter-menu'>
            <Breadcrumbs data={this.state.breadcrumbs} />
            {!this.state.new &&
            <A href='/admin/menus/new' className='button-clean'>
              <i className='material-icons'>library_add</i>
              <span>Add new menu</span>
            </A>}
          </div>
          <div className='admin-scrollable'>
            <div className='white-options list'>
              <TitleSlug
                title={this.state.menu.title}
                slug={this.state.menu.slug}
                validateSlug={this.validateSlug.bind(this)}
                onChange={this.onChange.bind(this)}
              />
              <Builder
                data={this.state.menu.data || []}
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
            <div className={cx('info', this.state.new && 'alerted')}>
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
}

Menu.contextTypes = {
  menu: React.PropTypes.object.isRequired,
  breadcrumbs: React.PropTypes.array.isRequired,
  user: React.PropTypes.object.isRequired,
  addOverlay: React.PropTypes.func.isRequired,
  closeOverlay: React.PropTypes.func.isRequired
};
