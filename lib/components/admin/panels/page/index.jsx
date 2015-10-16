import {Component} from 'relax-framework';
import {Router} from 'backbone';
import cloneDeep from 'lodash.clonedeep';
import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import merge from 'lodash.merge';
import Velocity from 'velocity-animate';
import Utils from '../../../../utils';

import A from '../../../a';
import Animate from '../../../animate';
import Spinner from '../../../spinner';
import Breadcrumbs from '../../../breadcrumbs';
import TitleSlug from '../../../title-slug';
// import RevisionsOverlay from '../../revisions-overlay';
import NotFound from '../not-found';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as pageActions from '../../../../actions/page';

@connect(
  (state) => ({
    page: state.page.data,
    isSlugValid: state.page.isSlugValid,
    errors: state.page.errors
  }),
  (dispatch) => bindActionCreators(pageActions, dispatch)
)
export default class Page extends Component {
  static fragments = {
    page: {
      _id: 1,
      __v: 1,
      title: 1,
      slug: 1,
      state: 1,
      date: 1,
      updatedDate: 1,
      createdBy: {
        _id: 1,
        email: 1,
        name: 1
      },
      updatedBy: {
        _id: 1,
        email: 1,
        name: 1
      }
    }
  }

  static propTypes = {
    page: React.PropTypes.object,
    user: React.PropTypes.object,
    breadcrumbs: React.PropTypes.array,
    slug: React.PropTypes.string,
    changePageFields: React.PropTypes.func,
    changePageToDefault: React.PropTypes.func
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.slug !== 'new' && nextProps.slug === 'new') {
      this.props.changePageToDefault();
    }
  }

  componentWillUnmount () {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }
  }

  onSubmit (pageProps) {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }

    const submitPage = cloneDeep(pageProps);

    let action;
    let routerOptions;
    if (this.isNew()) {
      submitPage.createdBy = this.props.user._id;
      action = this.props.addPage;
      routerOptions = {trigger: true};
    } else {
      submitPage.createdBy = submitPage.createdBy._id;
      action = this.props.updatePage;
      routerOptions = {trigger: false, replace: true};
    }

    submitPage.updatedBy = this.props.user._id;

    action(this.constructor.fragments, submitPage)
      .then(() => {
        this.setState({
          saving: false,
          success: true,
          error: false
        });
        Router.prototype.navigate('/admin/pages/' + submitPage.slug, routerOptions);
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
    const dom = React.findDOMNode(this.refs.success);

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

  onSaveDraft () {
    this.setState({
      saving: true,
      savingLabel: 'Saving draft'
    });

    this.onSubmit(this.props.page);
  }

  onUpdate () {
    this.setState({
      saving: true,
      savingLabel: 'Updating page'
    });

    this.onSubmit(this.props.page);
  }

  onPublish () {
    const clone = cloneDeep(this.props.page);
    clone.state = 'published';

    this.setState({
      saving: true,
      savingLabel: 'Publishing'
    });

    this.onSubmit(clone);
  }

  onUnpublish () {
    const clone = cloneDeep(this.props.page);
    clone.state = 'draft';

    this.setState({
      saving: true,
      savingLabel: 'Saving and unpublishing'
    });

    this.onSubmit(clone);
  }

  onChange (values) {
    this.props.changePageFields(merge({}, this.props.page, values));
  }

  isNew () {
    return !this.props.page._id && this.props.slug === 'new';
  }

  async validateSlug (slug) {
    const pageId = this.props.page._id;
    return await this.props.validateSlug({slug, pageId});
  }

  onRestore (__v) {
    this.context.closeOverlay();

    this.setState({
      saving: true,
      savingLabel: 'Restoring revision'
    });

    // pageActions
    //   .restore({
    //     _id: this.props.page._id,
    //     __v
    //   })
    //   .then((page) => {
    //     this.state.breadcrumbs[1].label = page.title;
    //     this.setState({
    //       saving: false,
    //       page,
    //       success: true,
    //       error: false,
    //       new: false,
    //       breadcrumbs: this.state.breadcrumbs
    //     });
    //     Router.prototype.navigate('/admin/pages/'+page.slug, {trigger: false, replace: true});
    //     this.successTimeout = setTimeout(this.successOut.bind(this), 3000);
    //   })
    //   .catch(() => {
    //     this.setState({
    //       success: false
    //     });
    //   });
  }

  onRevisions (event) {
    event.preventDefault();

    // const page = this.props.page;
    // const current = {
    //   _id: {
    //     _id: page._id,
    //     __v: page.__v
    //   },
    //   date: page.updatedDate,
    //   user: page.updatedBy,
    //   title: page.title
    // };

    // this.context.addOverlay(
    //   <RevisionsOverlay current={current} onRestore={this.onRestore.bind(this)} />
    // );
  }

  render () {
    const isNew = this.isNew();
    let result;

    if (!isNew && this.props.errors) {
      result = <NotFound />;
    } else {
      const published = this.props.page.state === 'published';
      const createdDate = isNew ? 'Creating' : moment(this.props.page.date).format('MMMM Do YYYY');

      const createdUser = isNew ? this.props.user : this.props.page.createdBy;
      const updatedUser = isNew ? this.props.user : this.props.page.updatedBy;

      const breadcrumbs = this.props.breadcrumbs.slice();
      breadcrumbs.push({
        label: this.props.page.title
      });

      result = (
        <div className='admin-page with-admin-sidebar'>
          <div className='content'>
            <div className='filter-menu'>
              <Breadcrumbs data={breadcrumbs} />
              {!this.isNew() &&
              <A href='/admin/pages/new' className='button-clean'>
                <i className='material-icons'>library_add</i>
                <span>Add new page</span>
              </A>}
            </div>
            <div className='admin-scrollable'>
              <div className='white-options list'>
                <TitleSlug
                  title={this.props.page.title}
                  slug={this.props.page.slug}
                  isSlugValid={this.props.isSlugValid}
                  validateSlug={::this.validateSlug}
                  onChange={::this.onChange}
                />
              </div>
            </div>
          </div>
          <div className='menu'>
            <div className='infos'>
              <div className={cx('info', !published && 'alerted')}>
                <i className='material-icons'>{published ? 'cloud_queue' : 'cloud_off'}</i>
                <span>State</span>
                <div>{this.props.page.state}</div>
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
            {this.renderlinks()}
            {this.renderActions()}
            {this.renderSaving()}
          </div>
        </div>
      );
    }

    return result;
  }

  renderlinks () {
    if (!this.isNew()) {
      const buildLink = '/admin/page/' + this.props.page.slug;
      const viewLink = '/' + this.props.page.slug;
      const revisions = this.props.page.__v;
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
          {revisions > 0 &&
            <a href='#' className='link' onClick={this.onRevisions.bind(this)}>
              <i className='material-icons'>history</i>
              <span>{'Revisions (' + revisions + ')'}</span>
            </a>
          }
        </div>
      );
    }
  }

  renderActions () {
    let result;
    if (this.props.page.state === 'published') {
      result = (
        <div className='actions'>
          <div className={cx('button button-primary', this.state.saving && 'disabled')} onClick={this.onUpdate.bind(this)}>Update</div>
          <div className={cx('button button-grey margined', this.state.saving && 'disabled')} onClick={this.onUnpublish.bind(this)}>Unpublish</div>
        </div>
      );
    } else {
      result = (
        <div className='actions'>
          <div className={cx('button button-primary', this.state.saving && 'disabled')} onClick={this.onPublish.bind(this)}>Publish</div>
          <div className={cx('button button-grey margined', this.state.saving && 'disabled')} onClick={this.onSaveDraft.bind(this)}>Save draft</div>
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
