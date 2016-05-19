import Component from 'components/component';
import ContentPageBuilder from 'components/content-page-builder';
import React, {PropTypes} from 'react';

import Info from './info';
import Revisions from './revisions';

export default class Template extends Component {
  static fragments = {
    template: {
      _id: 1,
      title: 1
    }
  };

  static propTypes = {
    template: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    updateTitle: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    toggleTemplateInfo: PropTypes.func.isRequired,
    toggleTemplateRevisions: PropTypes.func.isRequired,
    templateId: PropTypes.string.isRequired,
    sidebar: PropTypes.string
  };

  static defaultProps = {
    template: {}
  };

  render () {
    const {
      loading,
      template,
      templateId,
      updateTitle,
      sidebar,
      location,
      toggleTemplateRevisions,
      toggleTemplateInfo
    } = this.props;

    return (
      <ContentPageBuilder
        itemId={templateId}
        loading={loading}
        title={template && template.title}
        updateTitle={updateTitle}
        sidebar={sidebar}
        location={location}
        toggleRevisions={toggleTemplateRevisions}
        toggleInfo={toggleTemplateInfo}
        Info={Info}
        Revisions={Revisions}
        type='template'
      />
    );
  }
}
