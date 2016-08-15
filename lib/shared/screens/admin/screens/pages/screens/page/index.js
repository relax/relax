import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {updatePageTitle, updatePageSlug, updatePageTemplate} from 'actions/page';
import {addTab} from 'actions/tabs';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Page from './components/page';

@dataConnect(
  (state) => ({
    pageId: state.router.params.id,
    location: state.router.location
  }),
  (dispatch) => bindActionCreators({
    updatePageTitle,
    updatePageSlug,
    updatePageTemplate,
    addTab
  }, dispatch),
  (props) => ({
    fragments: Page.fragments,
    variablesTypes: {
      page: {
        _id: 'ID!'
      }
    },
    initialVariables: {
      page: {
        _id: props.pageId
      }
    }
  })
)
export default class PageContainer extends Component {
  static propTypes = {
    relate: PropTypes.object.isRequired,
    page: PropTypes.object,
    pageId: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    updatePageTitle: PropTypes.func.isRequired,
    updatePageSlug: PropTypes.func.isRequired,
    updatePageTemplate: PropTypes.func.isRequired,
    addTab: PropTypes.func.isRequired
  };

  getInitState () {
    this.processTab(this.props);
    return {
      sidebar: null
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.pageId !== nextProps.pageId && nextProps.pageId) {
      this.setState({
        sidebar: null
      });
      this.props.relate.refresh(nextProps);
    }

    const oldBuild = this.props.location.query.build;
    const currentBuild = nextProps.location.query.build;
    if (oldBuild !== currentBuild || this.props.pageId !== nextProps.pageId) {
      this.processTab(nextProps);
    }
  }

  processTab (props) {
    const currentBuild = props.location.query.build;
    if (currentBuild) {
      this.props.addTab('page', props.pageId);
    }
  }

  @bind
  updateTitle (title) {
    const {page} = this.props;
    return this.props.updatePageTitle(page._id, title);
  }

  @bind
  updateSlug (slug) {
    const {page} = this.props;
    return this.props.updatePageSlug(page._id, slug);
  }

  @bind
  updateTemplate (temlateId) {
    const {page} = this.props;
    return this.props.updatePageTemplate(page._id, temlateId);
  }

  @bind
  togglePageInfo () {
    const {sidebar} = this.state;
    this.setState({
      sidebar: sidebar === 'info' ? null : 'info'
    });
  }

  @bind
  togglePageRevisions () {
    const {sidebar} = this.state;
    this.setState({
      sidebar: sidebar === 'revisions' ? null : 'revisions'
    });
  }

  @bind
  togglePageTemplates () {
    const {sidebar} = this.state;
    this.setState({
      sidebar: sidebar === 'templates' ? null : 'templates'
    });
  }

  render () {
    const {page, location, loading, pageId} = this.props;
    return (
      <Page
        {...this.state}
        page={page}
        pageId={pageId}
        location={location}
        loading={loading}
        updateTitle={this.updateTitle}
        updateSlug={this.updateSlug}
        updateTemplate={this.updateTemplate}
        togglePageInfo={this.togglePageInfo}
        togglePageRevisions={this.togglePageRevisions}
        togglePageTemplates={this.togglePageTemplates}
      />
    );
  }
}
