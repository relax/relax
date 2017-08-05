import Animate from 'components/animate';
import Button from 'components/button';
import Component from 'components/component';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentLoading from 'components/content-loading';
import ContentNotFound from 'components/content-not-found';
import ContentSidebar from 'components/content-sidebar';
import EditableTitle from 'components/editable-title';
import ModalDelete from 'components/modal-delete';
import PageBuilder from 'components/page-builder';
import cx from 'classnames';
import velocity from 'relax-velocity-animate';
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {findDOMNode} from 'react-dom';

import TemplatePicker from './template-picker';
import Templates from './templates';
import ToggleButton from './toggle-button';
import styles from './content-page-builder.less';

export default class ContentPageBuilder extends Component {
  static propTypes = {
    children: PropTypes.any,
    itemId: PropTypes.string,
    loading: PropTypes.bool,
    title: PropTypes.string,
    slug: PropTypes.string,
    state: PropTypes.string,
    notFound: PropTypes.bool,
    updateTitle: PropTypes.func.isRequired,
    updateSlug: PropTypes.func,
    updateTemplate: PropTypes.func,
    sidebar: PropTypes.string,
    location: PropTypes.object.isRequired,
    removeConfirm: PropTypes.bool,
    toggleRemoveConfirm: PropTypes.func.isRequired,
    confirmRemove: PropTypes.func.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    publish: PropTypes.func.isRequired,
    unpublish: PropTypes.func.isRequired,
    Revisions: PropTypes.func,
    type: PropTypes.string.isRequired,
    templateId: PropTypes.string,
    draftHasChanges: PropTypes.bool.isRequired,
    openDropDraftConfirmation: PropTypes.func.isRequired,
    openPushChangesConfirmation: PropTypes.func.isRequired,
    openUnpublishConfirmation: PropTypes.func.isRequired,
    closeUnpublishConfirmation: PropTypes.func.isRequired,
    defaultTemplateId: PropTypes.string,
    confirmUnpublish: PropTypes.bool
  };

  getInitState () {
    const {location} = this.props;
    return {
      build: !!location.query.build,
      removeConfirm: false
    };
  }

  componentWillReceiveProps (nextProps) {
    const {location} = this.props;
    const oldBuild = location.query.build;
    const currentBuild = nextProps.location.query.build;

    if (this.props.itemId !== nextProps.itemId) {
      this.setState({
        build: !!currentBuild
      });
    }

    if (oldBuild !== currentBuild) {
      const config = {
        duration: 800,
        display: null,
        easing: 'easeOutExpo'
      };

      if (currentBuild) {
        velocity.hook(this.refs.content, 'translateY', '70px');
        velocity(this.refs.content, {translateY: '0px'}, config);
        velocity(findDOMNode(this.refs.cover), {opacity: 0}, Object.assign({}, config, {display: 'none'}));
      } else {
        velocity.hook(this.refs.content, 'translateY', '0px');
        velocity(this.refs.content, {translateY: '70px'}, config);
        velocity(findDOMNode(this.refs.cover), {opacity: 1}, Object.assign({}, config, {display: 'block'}));
      }
    }
  }

  render () {
    const {loading, notFound} = this.props;
    let result;

    if (loading) {
      result = this.renderLoading();
    } else if (notFound) {
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
    const {type} = this.props;

    return (
      <ContentNotFound name={type} />
    );
  }

  renderContent () {
    return (
      <Animate transition='fadeIn'>
        <div className={cx(this.state.build && styles.build)}>
          {this.renderHeader()}
          {this.renderContentArea()}
        </div>
      </Animate>
    );
  }

  renderContentArea () {
    const {children} = this.props;
    let result;

    if (children) {
      result = (
        <div className={styles.customContent}>
          {children}
          {this.renderSidebar()}
        </div>
      );
    } else {
      const {location, type, itemId, defaultTemplateId} = this.props;

      result = (
        <div className={styles.content} ref='content'>
          <PageBuilder itemId={itemId} type={type} defaultTemplateId={defaultTemplateId} />
          <Link to={{pathname: location.pathname, query: {build: 1}}} className={styles.cover} ref='cover'>
            <div className={styles.coverContent}>
              <i className='nc-icon-outline design_design'></i>
              <div>Click to Build</div>
            </div>
          </Link>
          {this.renderSaveState()}
          <div className={styles.contentPage}>
            {this.renderSidebar()}
          </div>
        </div>
      );
    }

    return result;
  }

  renderSaveState () {
    const {draftHasChanges, location} = this.props;
    const isBuild = location.query.build;

    if (draftHasChanges && !isBuild) {
      const {openPushChangesConfirmation, openDropDraftConfirmation} = this.props;

      return (
        <Animate transition='fadeIn'>
          <div className={styles.push}>
            <div className={styles.pushText}>
              There's unpublished changes in your draft
            </div>
            <Button big noBackground grey onClick={openDropDraftConfirmation}>
              Drop Changes
            </Button>
            <Button primary big noBackground bordered onClick={openPushChangesConfirmation}>
              Push Changes Live
            </Button>
          </div>
        </Animate>
      );
    }
  }

  renderHeader () {
    const {title, slug, updateTitle, updateSlug, sidebar, toggleSidebar, toggleRemoveConfirm} = this.props;

    return (
      <ContentHeader smallPadding ref='header'>
        <div className={styles.info}>
          <EditableTitle value={title} onSubmit={updateTitle} big={!slug} noProgress />
          {slug && <EditableTitle sub value={slug} onSubmit={updateSlug} noProgress />}
        </div>
        <ContentHeaderActions>
          {this.renderTemplatePicker()}
          {this.renderPublish()}
          <ToggleButton
            onClick={toggleSidebar}
            active={sidebar === 'revisions'}
            className={styles.actionButton}
            activeClassName={styles.active}
            id='revisions'
          >
            <i className='nc-icon-outline ui-2_time'></i>
          </ToggleButton>
          <button
            className={cx(styles.actionButton)}
            onClick={toggleRemoveConfirm}
          >
            <i className='nc-icon-outline ui-1_trash'></i>
          </button>
          {this.renderRemoveConfirm()}
        </ContentHeaderActions>
      </ContentHeader>
    );
  }

  renderPublish () {
    const {state} = this.props;
    let result;

    if (state === 'draft') {
      const {openPushChangesConfirmation} = this.props;

      return (
        <button
          className={cx(styles.actionButton, styles.publishButton)}
          onClick={openPushChangesConfirmation}
        >
          <i className='nc-icon-outline travel_world' />
          <span>Publish</span>
        </button>
      );
    } else if (state === 'published') {
      const {openUnpublishConfirmation} = this.props;

      return (
        <button
          className={cx(styles.actionButton, styles.unpublishButton)}
          onClick={openUnpublishConfirmation}
        >
          <i className='nc-icon-outline arrows-1_back-78' />
          <span>Unpublish</span>
          {this.renderUnpublishConfirm()}
        </button>
      );
    }

    return result;
  }

  renderUnpublishConfirm () {
    const {confirmUnpublish} = this.props;

    if (confirmUnpublish) {
      const {closeUnpublishConfirmation, unpublish} = this.props;

      return (
        <ModalDelete
          cancelLabel='Cancel'
          deleteLabel='Unpublish'
          title='Are you sure?'
          subTitle='You are about to unpublish this page. This will make this page non available to the public.'
          cancel={closeUnpublishConfirmation}
          submit={unpublish}
        />
      );
    }
  }

  renderTemplatePicker () {
    const {type, toggleSidebar, sidebar, templateId} = this.props;

    if (type !== 'template') {
      return (
        <TemplatePicker
          templateId={templateId}
          onClick={toggleSidebar}
          active={sidebar === 'templates'}
        />
      );
    }
  }

  renderRemoveConfirm () {
    const {removeConfirm, toggleRemoveConfirm, confirmRemove} = this.props;

    if (removeConfirm) {
      const {title} = this.props;

      return (
        <ModalDelete
          title={`Are you sure you want to remove "${title}"?`}
          cancel={toggleRemoveConfirm}
          submit={confirmRemove}
        />
      );
    }
  }

  renderSidebar () {
    const {sidebar, location} = this.props;
    const opened = sidebar !== null && !location.query.build;

    return (
      <ContentSidebar opened={opened}>
        {this.renderSidebarContent()}
      </ContentSidebar>
    );
  }

  renderSidebarContent () {
    const {sidebar, Revisions} = this.props;
    let result;

    if (sidebar === 'revisions' && Revisions) {
      result = (
        <Revisions />
      );
    } else if (sidebar === 'templates') {
      const {templateId, updateTemplate, type, itemId} = this.props;
      result = (
        <Templates
          type={type}
          itemId={itemId}
          value={templateId}
          onChange={updateTemplate}
        />
      );
    }

    return result;
  }
}
