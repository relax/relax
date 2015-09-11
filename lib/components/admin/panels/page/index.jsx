import {Component, Router} from 'relax-framework';
import cloneDeep from 'lodash.clonedeep';
import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import Velocity from 'velocity-animate';

import A from '../../../a';
import Animate from '../../../animate';
import Spinner from '../../../spinner';
import Breadcrumbs from '../../../breadcrumbs';
import TitleSlug from '../../../title-slug';

import pageActions from '../../../../client/actions/page';

export default class Page extends Component {
  getInitialState () {
    let defaults = {
      title: 'New Page',
      slug: 'new-page',
      state: 'draft'
    };

    return {
      page: cloneDeep(this.context.page) || defaults,
      new: !(this.context.page && this.context.page._id),
      breadcrumbs: this.context.breadcrumbs
    };
  }

  componentWillUnmount () {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }
  }

  onSubmit (data) {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }

    let action;
    if (this.state.new) {
      action = pageActions.add;
    } else {
      action = pageActions.update;
    }

    action(data)
      .then((page) => {
        this.setState({
          saving: false,
          page,
          success: true,
          error: false,
          new: false
        });
        Router.prototype.navigate('/admin/pages/'+page.slug, {trigger: false, replace: true});
        this.successTimeout = setTimeout(this.successOut.bind(this), 3000);
        this.context.page = cloneDeep(page);
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

    var dom = React.findDOMNode(this.refs.success);
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

  onSaveDraft () {
    this.setState({
      saving: true,
      savingLabel: 'Saving draft'
    });

    this.onSubmit(this.state.page);
  }

  onUpdate () {
    this.setState({
      saving: true,
      savingLabel: 'Updating page'
    });

    this.onSubmit(this.state.page);
  }

  onPublish () {
    let clone = cloneDeep(this.state.page);
    clone.state = 'published';

    this.setState({
      saving: true,
      savingLabel: 'Publishing'
    });

    this.onSubmit(clone);
  }

  onUnpublish () {
    let clone = cloneDeep(this.state.page);
    clone.state = 'draft';

    this.setState({
      saving: true,
      savingLabel: 'Saving and unpublishing'
    });

    this.onSubmit(clone);
  }

  onFieldChange (id, value) {
    this.state.page[id] = value;

    this.setState({
      page: this.state.page
    });
  }

  onChange (values) {
    if (values.title) {
      this.state.breadcrumbs[1].label = values.title;
      this.state.page.title = values.title;
    }
    if (values.slug) {
      this.state.page.slug = values.slug;
    }

    this.setState({
      page: this.state.page,
      breadcrumbs: this.state.breadcrumbs
    });
  }

  validateSlug (slug) {
    if (!this.state.new) {
      if (this.context.page.slug === slug) {
        return false;
      }
    }

    if (slug === 'new') {
      return true;
    }

    return pageActions.validateSlug(slug);
  }

  renderlinks () {
    if (!this.state.new) {
      const buildLink = '/admin/page/'+this.state.page.slug;
      const viewLink = '/'+this.state.page.slug;
      return (
        <div className='links'>
          <A className='link' href={buildLink}>
            <i className='material-icons'>build</i>
            <span>Build</span>
          </A>
          <a className='link' href={viewLink} target='_blank'>
            <i className='material-icons'>link</i>
            <span>View</span>
          </a>
        </div>
      );
    }
  }

  renderActions () {
    if (this.state.page.state === 'published') {
      return (
        <div className='actions'>
          <div className={cx('button button-primary', this.state.saving && 'disabled')} onClick={this.onUpdate.bind(this)}>Update</div>
          <div className={cx('button button-grey margined', this.state.saving && 'disabled')} onClick={this.onUnpublish.bind(this)}>Unpublish</div>
        </div>
      );
    } else {
      return (
        <div className='actions'>
          <div className={cx('button button-primary', this.state.saving && 'disabled')} onClick={this.onPublish.bind(this)}>Publish</div>
          <div className={cx('button button-grey margined', this.state.saving && 'disabled')} onClick={this.onSaveDraft.bind(this)}>Save draft</div>
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
    const published = this.state.page.state === 'published';
    const createdDate = this.state.new ? 'Creating' : moment(this.state.page.date).format('MMMM Do YYYY');

    return (
      <div className='admin-page with-admin-sidebar'>
        <div className='content'>
          <div className='filter-menu'>
            <Breadcrumbs data={this.state.breadcrumbs} />
          </div>
          <div className='admin-scrollable'>
            <div className='white-options list'>
              <TitleSlug
                title={this.state.page.title}
                slug={this.state.page.slug}
                validateSlug={this.validateSlug.bind(this)}
                onChange={this.onChange.bind(this)}
              />
            </div>
          </div>
        </div>
        <div className='menu'>
          <div className='infos'>
            <div className={cx('info', !published && 'alerted')}>
              <i className='material-icons'>{published ? 'cloud_queue' : 'cloud_off'}</i>
              <span>State</span>
              <div>{this.state.page.state}</div>
            </div>
            <div className={cx('info', this.state.new && 'alerted')}>
              <i className='material-icons'>today</i>
              <span>Created at</span>
              <div>{createdDate}</div>
            </div>
          </div>
          {this.renderlinks()}
          {this.renderActions()}
          {this.renderSaving()}
        </div>
      </div>
    );
  }
}

Page.contextTypes = {
  page: React.PropTypes.object.isRequired,
  breadcrumbs: React.PropTypes.array.isRequired
};
