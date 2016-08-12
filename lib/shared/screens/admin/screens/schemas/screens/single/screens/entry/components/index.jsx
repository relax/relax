import Component from 'components/component';
import ContentLoading from 'components/content-loading';
import ContentNotFound from 'components/content-not-found';
import ContentPageBuilder from 'components/content-page-builder';
import React, {PropTypes} from 'react';

import Info from './info';
import Revisions from './revisions';

export default class SchemaEntry extends Component {
  static fragments = {
    schema: {
      _id: 1,
      template: ContentPageBuilder.fragments.template
    },
    schemaEntry: {
      _id: 1,
      title: 1,
      slug: 1,
      template: ContentPageBuilder.fragments.template
    }
  };

  static propTypes = {
    schema: PropTypes.object.isRequired,
    schemaEntry: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    updateTitle: PropTypes.func.isRequired,
    updateSlug: PropTypes.func.isRequired,
    updateTemplate: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    toggleInfo: PropTypes.func.isRequired,
    toggleRevisions: PropTypes.func.isRequired,
    toggleTemplates: PropTypes.func.isRequired,
    sidebar: PropTypes.string,
    entryId: PropTypes.string.isRequired,
    schemaId: PropTypes.string.isRequired
  };

  static defaultProps = {
    schemaEntry: {}
  };

  render () {
    const {loading, schemaEntry} = this.props;
    let result;

    if (loading) {
      result = this.renderLoading();
    } else if (!schemaEntry) {
      result = this.renderNotFound();
    } else {
      result = this.renderContent();
    }

    return result;
  }

  renderLoading () {
    return (
      <ContentLoading />
    );
  }

  renderNotFound () {
    return (
      <ContentNotFound name='entry' />
    );
  }

  renderContent () {
    const {
      loading,
      schema,
      schemaEntry,
      entryId,
      schemaId,
      updateTitle,
      updateSlug,
      updateTemplate,
      sidebar,
      location,
      toggleRevisions,
      toggleInfo,
      toggleTemplates
    } = this.props;

    const template =
      schemaEntry && schemaEntry.template ||
      schema && schema.template;

    return (
      <ContentPageBuilder
        itemId={entryId}
        loading={loading}
        title={schemaEntry && schemaEntry.title}
        slug={schemaEntry && schemaEntry.slug}
        template={template}
        updateTitle={updateTitle}
        updateSlug={updateSlug}
        updateTemplate={updateTemplate}
        sidebar={sidebar}
        location={location}
        toggleRevisions={toggleRevisions}
        toggleInfo={toggleInfo}
        toggleTemplates={toggleTemplates}
        Info={Info}
        Revisions={Revisions}
        type={schemaId}
      />
    );
  }
}
