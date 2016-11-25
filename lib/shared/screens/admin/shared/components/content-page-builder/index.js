import Component from 'components/component';
import bind from 'decorators/bind';
import React, {PropTypes} from 'react';
import {addTab} from 'actions/tabs';
import {bindActionCreators} from 'redux';
import {changeDocProperty, openDropDraftConfirmation, openPushChangesConfirmation} from 'actions/page-builder';
import {dataConnect} from 'relate-js';

import ContentPageBuilder from './content-page-builder';

@dataConnect(
  (state) => ({
    location: state.router.location,
    draftHasChanges: state.pageBuilder.actions.length > 0 || state.pageBuilder.restored,
    title: state.pageBuilder.doc && state.pageBuilder.doc.title,
    slug: state.pageBuilder.doc && state.pageBuilder.doc.slug,
    templateId: state.pageBuilder.doc && state.pageBuilder.doc.template
  }),
  (dispatch) => bindActionCreators({
    addTab,
    openDropDraftConfirmation,
    openPushChangesConfirmation,
    changeDocProperty
  }, dispatch),
  (props) => ({
    fragments: {
      draft: {
        _id: 1,
        __v: 1,
        itemId: 1,
        userId: 1,
        type: 1,
        doc: 1,
        actions: 1,
        restored: 1
      }
    },
    variablesTypes: {
      draft: {
        id: 'ID!',
        type: 'String!'
      }
    },
    initialVariables: {
      draft: {
        id: props.itemId,
        type: props.type
      }
    }
  })
)
export default class ContentPageBuilderContainer extends Component {
  static propTypes = {
    children: PropTypes.any,
    type: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    title: PropTypes.string,
    slug: PropTypes.string,
    state: PropTypes.string,
    templateId: PropTypes.string,
    defaultTemplateId: PropTypes.string,
    location: PropTypes.object.isRequired,
    publish: PropTypes.func.isRequired,
    unpublish: PropTypes.func.isRequired,
    updateTemplate: PropTypes.func,
    onRemove: PropTypes.func.isRequired,
    addTab: PropTypes.func.isRequired,
    Revisions: PropTypes.func,
    draftHasChanges: PropTypes.bool.isRequired,
    openDropDraftConfirmation: PropTypes.func.isRequired,
    openPushChangesConfirmation: PropTypes.func.isRequired,
    changeDocProperty: PropTypes.func.isRequired
  };

  getInitState () {
    this.processTab(this.props);

    return {
      sidebar: null,
      removeConfirm: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.itemId !== nextProps.itemId && nextProps.itemId) {
      this.props.relate.refresh(nextProps);
      this.setState({
        sidebar: null
      });
    }

    const oldBuild = this.props.location.query.build;
    const currentBuild = nextProps.location.query.build;
    if (oldBuild !== currentBuild || this.props.itemId !== nextProps.itemId) {
      this.processTab(nextProps);
    }
  }

  processTab (props) {
    const {location, type} = props;
    const currentBuild = location.query.build;

    if (currentBuild) {
      this.props.addTab(type, props.itemId);
    }
  }

  @bind
  toggleSidebar (id) {
    const {sidebar} = this.state;
    this.setState({
      sidebar: sidebar === id ? null : id
    });
  }

  @bind
  toggleRemoveConfirm () {
    this.setState({
      removeConfirm: !this.state.removeConfirm
    });
  }

  @bind
  confirmRemove () {
    const {onRemove, itemId} = this.props;
    onRemove(itemId, true);
  }

  @bind
  updateTitle (value) {
    this.props.changeDocProperty('title', value);
  }

  @bind
  updateSlug (value) {
    this.props.changeDocProperty('slug', value);
  }

  @bind
  updateTemplate (value) {
    this.props.changeDocProperty('template', value);
  }

  @bind
  publish () {
    const {publish, itemId} = this.props;
    publish(itemId);
  }

  @bind
  unpublish () {
    const {unpublish, itemId} = this.props;
    unpublish(itemId);
  }

  render () {
    const {
      type,
      itemId,
      loading,
      title,
      slug,
      state,
      templateId,
      defaultTemplateId,
      location,
      draftHasChanges,
      Revisions
    } = this.props;

    return (
      <ContentPageBuilder
        {...this.state}
        type={type}
        itemId={itemId}
        loading={loading}
        title={title}
        slug={slug}
        state={state}
        templateId={templateId || defaultTemplateId}
        defaultTemplateId={defaultTemplateId}
        location={location}
        draftHasChanges={draftHasChanges}
        openDropDraftConfirmation={this.props.openDropDraftConfirmation}
        openPushChangesConfirmation={this.props.openPushChangesConfirmation}
        Revisions={Revisions}
        updateTitle={this.updateTitle}
        updateSlug={this.updateSlug}
        updateTemplate={this.updateTemplate}
        publish={this.publish}
        unpublish={this.unpublish}
        toggleSidebar={this.toggleSidebar}
        toggleRemoveConfirm={this.toggleRemoveConfirm}
        confirmRemove={this.confirmRemove}
      >
        {this.props.children}
      </ContentPageBuilder>
    );
  }
}
