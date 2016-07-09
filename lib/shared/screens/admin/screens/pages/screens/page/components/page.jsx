import Component from 'components/component';
import ContentPageBuilder from 'components/content-page-builder';
import React, {PropTypes} from 'react';

import Info from './info';
import Revisions from './revisions';

export default class Page extends Component {
  static fragments = {
    page: {
      _id: 1,
      title: 1,
      slug: 1,
      template: {
        _id: 1,
        title: 1
      }
    }
  };

  static propTypes = {
    page: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    updateTitle: PropTypes.func.isRequired,
    updateSlug: PropTypes.func.isRequired,
    updateTemplate: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    togglePageInfo: PropTypes.func.isRequired,
    togglePageRevisions: PropTypes.func.isRequired,
    togglePageTemplates: PropTypes.func.isRequired,
    pageId: PropTypes.string.isRequired,
    sidebar: PropTypes.string
  };

  static defaultProps = {
    page: {}
  };

  render () {
    const {
      loading,
      page,
      pageId,
      updateTitle,
      updateSlug,
      updateTemplate,
      sidebar,
      location,
      togglePageRevisions,
      togglePageInfo,
      togglePageTemplates
    } = this.props;

    return (
      <ContentPageBuilder
        itemId={pageId}
        loading={loading}
        title={page && page.title}
        slug={page && page.slug}
        template={page && page.template}
        updateTitle={updateTitle}
        updateSlug={updateSlug}
        updateTemplate={updateTemplate}
        sidebar={sidebar}
        location={location}
        toggleRevisions={togglePageRevisions}
        toggleInfo={togglePageInfo}
        toggleTemplates={togglePageTemplates}
        Info={Info}
        Revisions={Revisions}
        type='page'
      />
    );
  }
}
