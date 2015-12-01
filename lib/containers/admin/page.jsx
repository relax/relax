import * as overlaysActions from '../../client/actions/overlays';
import * as pageActions from '../../client/actions/page';

import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import Page from '../../components/admin/panels/page';
import RevisionsContainer from './revisions';

@connect(
  (state) => ({
    page: state.page.data,
    isSlugValid: state.page.isSlugValid,
    errors: state.page.errors
  }),
  (dispatch) => ({
    ...bindActionCreators(pageActions, dispatch),
    ...bindActionCreators(overlaysActions, dispatch)
  })
)
export default class PageContainer extends Component {
  static fragments = Page.fragments

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

  static propTypes = {
    page: PropTypes.object,
    user: PropTypes.object,
    id: PropTypes.string,
    changePageFields: PropTypes.func,
    changePageToDefault: PropTypes.func,
    addPage: PropTypes.func.isRequired,
    addOverlay: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired,
    validatePageSlug: PropTypes.func.isRequired,
    updatePage: PropTypes.func.isRequired,
    restorePage: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  getInitState () {
    if (this.props.id === 'new') {
      this.props.changePageToDefault();
    }
    return {};
  }

  componentWillUnmount () {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }
  }

  async onSubmit (pageProps) {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }

    const submitPage = cloneDeep(pageProps);
    const isNew = this.isNew();

    let action;

    if (isNew) {
      submitPage.createdBy = this.props.user._id;
      action = this.props.addPage;
    } else {
      submitPage.createdBy = submitPage.createdBy._id;
      action = this.props.updatePage;
    }

    submitPage.updatedBy = this.props.user._id;

    try {
      const resultPage = await action(this.constructor.fragments, submitPage);
      this.setState({
        saving: false,
        success: true,
        error: false
      });
      if (isNew) {
        this.props.history.pushState({}, `/admin/pages/${resultPage._id}`);
      }
      this.successTimeout = setTimeout(::this.onSuccessOut, 3000);
    } catch (err) {
      this.setState({
        saving: false,
        error: true
      });
    }
  }

  onSuccessOut () {
    clearTimeout(this.successTimeout);
    // FIXME
    // const dom = findDOMNode(this.refs.success);
    //
    // if (dom) {
    //   const transition = 'transition.slideDownOut';
    //   Velocity(dom, transition, {
    //     duration: 400,
    //     display: null
    //   }).then(() => {
    //     this.setState({
    //       success: false
    //     });
    //   });
    // }
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

  async onRestore (__v) {
    this.setState({
      saving: true,
      savingLabel: 'Restoring revision'
    });

    try {
      await this.props.restorePage(this.constructor.fragments, this.props.page._id, __v);
      this.setState({
        saving: false,
        success: true,
        error: false
      });
      this.successTimeout = setTimeout(::this.onSuccessOut, 3000);
    } catch (err) {
      this.setState({
        success: false,
        error: 'Error restoring page revision'
      });
    }
  }

  getCurrentPageProps () {
    const {page} = this.props;

    return {
      _id: {
        _id: page._id,
        __v: page.__v
      },
      date: page.updatedDate,
      user: page.updatedBy,
      title: page.title
    };
  }

  onRevisions (event) {
    event.preventDefault();
    this.props.addOverlay(
      'revisions',
      (
        <RevisionsContainer
          id={this.props.page._id}
          onRestore={::this.onRestore}
          current={this.getCurrentPageProps()}
        />
      )
    );
  }

  isNew () {
    return !this.props.page._id;
  }

  async validateSlug (slug, pageId = this.props.page._id) {
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
        onUnpublish={::this.onUnpublish}
        onUpdate={::this.onUpdate}
        validateSlug={::this.validateSlug}
      />
    );
  }
}
