import Component from 'components/component';
import bind from 'decorators/bind';
import React, {PropTypes} from 'react';
import {addTab} from 'actions/tabs';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import ContentPageBuilder from './content-page-builder';

@connect(
  (state) => ({
    location: state.router.location
  }),
  (dispatch) => bindActionCreators({addTab}, dispatch)
)
export default class ContentPageBuilderContainer extends Component {
  static fragments = {
    template: {
      _id: 1,
      title: 1,
      data: 1,
      links: 1
    }
  };

  static propTypes = {
    type: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    title: PropTypes.string,
    slug: PropTypes.string,
    state: PropTypes.string,
    template: PropTypes.object,
    location: PropTypes.object.isRequired,
    updateTitle: PropTypes.func.isRequired,
    updateSlug: PropTypes.func.isRequired,
    publish: PropTypes.func.isRequired,
    unpublish: PropTypes.func.isRequired,
    updateTemplate: PropTypes.func,
    onRemove: PropTypes.func.isRequired,
    addTab: PropTypes.func.isRequired,
    Revisions: PropTypes.func
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
    const {updateTitle, itemId} = this.props;
    return updateTitle(itemId, value);
  }

  @bind
  updateSlug (value) {
    const {updateSlug, itemId} = this.props;
    return updateSlug(itemId, value);
  }

  @bind
  updateTemplate (value) {
    const {updateTemplate, itemId} = this.props;
    updateTemplate(itemId, value);
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
      template,
      location,
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
        template={template}
        location={location}
        Revisions={Revisions}
        updateTitle={this.updateTitle}
        updateSlug={this.updateSlug}
        updateTemplate={this.updateTemplate}
        publish={this.publish}
        unpublish={this.unpublish}
        toggleSidebar={this.toggleSidebar}
        toggleRemoveConfirm={this.toggleRemoveConfirm}
        confirmRemove={this.confirmRemove}
      />
    );
  }
}
