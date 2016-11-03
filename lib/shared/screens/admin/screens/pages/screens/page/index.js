import * as pageActions from 'actions/page';
import Component from 'components/component';
import ContentPageBuilder from 'components/content-page-builder';
import bind from 'decorators/bind';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Revisions from './components/revisions';

@dataConnect(
  (state) => ({
    pageId: state.router.params.id
  }),
  (dispatch) => bindActionCreators(pageActions, dispatch),
  (props) => ({
    fragments: {
      page: {
        _id: 1,
        title: 1,
        slug: 1,
        state: 1,
        template: ContentPageBuilder.fragments.template
      }
    },
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
    updatePageTitle: PropTypes.func.isRequired,
    updatePageSlug: PropTypes.func.isRequired,
    updatePageTemplate: PropTypes.func.isRequired,
    removePage: PropTypes.func.isRequired,
    publishPage: PropTypes.func,
    unpublishPage: PropTypes.func
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.pageId !== nextProps.pageId && nextProps.pageId) {
      this.props.relate.refresh(nextProps);
    }
  }

  @bind
  removePage () {
    const {removePage, pageId} = this.props;
    removePage(pageId, true);
  }

  render () {
    const {
      page,
      loading,
      pageId,
      updatePageTitle,
      updatePageSlug,
      updatePageTemplate,
      publishPage,
      unpublishPage
    } = this.props;

    return (
      <ContentPageBuilder
        itemId={pageId}
        loading={loading}
        title={page && page.title}
        slug={page && page.slug}
        template={page && page.template}
        state={page && page.state}
        updateTitle={updatePageTitle}
        updateSlug={updatePageSlug}
        updateTemplate={updatePageTemplate}
        onRemove={this.removePage}
        publish={publishPage}
        unpublish={unpublishPage}
        Revisions={Revisions}
        type='page'
      />
    );
  }
}
