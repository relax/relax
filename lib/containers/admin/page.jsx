import {Component} from 'relax-framework';
import {Router} from 'backbone';
import cloneDeep from 'lodash.clonedeep';
import React, {PropTypes} from 'react';
import merge from 'lodash.merge';
import Velocity from 'velocity-animate';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as pageActions from '../../actions/page';
import Page from '../../components/admin/panels/page';

@connect(
  (state) => ({
    page: state.page.data,
    isSlugValid: state.page.isSlugValid,
    errors: state.page.errors
  }),
  (dispatch) => bindActionCreators(pageActions, dispatch)
)
export default class PageContainer extends Component {
  static fragments = Page.fragments

  static propTypes = {
    page: PropTypes.object,
    user: PropTypes.object,
    slug: PropTypes.string,
    changePageFields: PropTypes.func,
    changePageToDefault: PropTypes.func,
    addPage: PropTypes.func.isRequired,
    validatePageSlug: PropTypes.func.isRequired,
    updatePage: PropTypes.func.isRequired
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

  static panelSettings = {
    activePanelType: 'page',
    breadcrumbs: [
      {
        label: 'Pages',
        type: 'pages',
        link: '/admin/pages'
      }
    ]
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
        this.successTimeout = setTimeout(::this.successOut, 3000);
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

  isNew () {
    return !this.props.page._id;
  }

  async validateSlug (slug) {
    const pageId = this.props.page._id;
    return await this.props.validatePageSlug({slug, pageId});
  }

  render () {
    return (
      <Page
        {...this.props}
        {...this.state}
        isNew={this.isNew()}
        onChange={::this.onChange}
        onPublish={::this.onPublish}
        onRevisions={::this.onRevisions}
        onRestore={::this.onRestore}
        onSaveDraft={::this.onSaveDraft}
        onUnpublish={::this.onPublish}
        onUpdate={::this.onUpdate}
        validateSlug={::this.validateSlug}
      />
    );
  }
}
