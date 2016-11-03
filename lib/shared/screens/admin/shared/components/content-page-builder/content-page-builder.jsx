import A from 'components/a';
import Animate from 'components/animate';
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
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import Templates from './templates';
import ToggleButton from './toggle-button';
import styles from './content-page-builder.less';

export default class ContentPageBuilder extends Component {
  static propTypes = {
    itemId: PropTypes.string,
    loading: PropTypes.bool,
    title: PropTypes.string,
    slug: PropTypes.string,
    state: PropTypes.string,
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
    template: PropTypes.object
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
    const {loading, title} = this.props;
    let result;

    if (loading) {
      result = this.renderLoading();
    } else if (!title) {
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
    const {location, type, template, itemId} = this.props;

    return (
      <Animate transition='fadeIn'>
        <div className={cx(this.state.build && styles.build)}>
          {this.renderHeader()}
          <div className={styles.content} ref='content'>
            <PageBuilder
              itemId={itemId}
              type={type}
              template={template}
            />
            <A href={location.pathname} query={{build: 1}} className={styles.cover} ref='cover'>
              <div className={styles.coverContent}>
                <i className='nc-icon-outline design_design'></i>
                <div>Click to Build</div>
              </div>
            </A>
            <div className={styles.contentPage}>
              {this.renderSidebar()}
            </div>
          </div>
        </div>
      </Animate>
    );
  }

  renderHeader () {
    const {title, slug, updateTitle, updateSlug, sidebar, toggleSidebar, toggleRemoveConfirm} = this.props;

    return (
      <ContentHeader smallPadding ref='header'>
        <div className={styles.info}>
          <EditableTitle value={title} onSubmit={updateTitle} big={!slug} />
          {slug && <EditableTitle sub value={slug} onSubmit={updateSlug} />}
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
      const {publish} = this.props;

      return (
        <button className={cx(styles.actionButton, styles.publishButton)} onClick={publish}>
          <i className='nc-icon-outline travel_world' />
          <span>Publish</span>
        </button>
      );
    } else if (state === 'published') {
      const {unpublish} = this.props;

      return (
        <button className={cx(styles.actionButton, styles.unpublishButton)} onClick={unpublish}>
          <i className='nc-icon-outline arrows-1_back-78' />
          <span>Unpublish</span>
        </button>
      );
    }

    return result;
  }

  renderTemplatePicker () {
    const {type, toggleSidebar, sidebar, template} = this.props;

    if (type !== 'template') {
      const opened = sidebar === 'templates';
      const title = template && template.title || 'None selected';

      return (
        <ToggleButton
          onClick={toggleSidebar}
          active={sidebar === 'templates'}
          className={styles.templatePicker}
          id='templates'
        >
          <div className={styles.tpLabel}>Template:</div>
          <div className={cx(styles.tpValue, !template && styles.none)}>
            {title}
          </div>
          <i className={cx('nc-icon-mini', opened ? 'arrows-1_minimal-up' : 'arrows-1_minimal-down')} />
        </ToggleButton>
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
      const {template, updateTemplate, type, itemId} = this.props;
      result = (
        <Templates
          type={type}
          itemId={itemId}
          value={template && template._id}
          onChange={updateTemplate}
        />
      );
    }

    return result;
  }
}
