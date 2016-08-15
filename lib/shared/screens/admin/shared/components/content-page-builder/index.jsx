import cx from 'classnames';
import velocity from 'velocity-animate';
import A from 'components/a';
import Animate from 'components/animate';
import Component from 'components/component';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentSidebar from 'components/content-sidebar';
import EditableTitle from 'components/editable-title';
import PageBuilder from 'components/page-builder';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import styles from './index.less';
import Templates from './templates';

export default class ContentPageBuilder extends Component {
  static fragments = {
    template: {
      _id: 1,
      title: 1,
      data: 1,
      links: 1
    }
  };

  static propTypes = {
    itemId: PropTypes.string,
    loading: PropTypes.bool,
    title: PropTypes.string,
    slug: PropTypes.string,
    updateTitle: PropTypes.func.isRequired,
    updateSlug: PropTypes.func,
    updateTemplate: PropTypes.func.isRequired,
    sidebar: PropTypes.string,
    location: PropTypes.object.isRequired,
    toggleRevisions: PropTypes.func.isRequired,
    toggleInfo: PropTypes.func.isRequired,
    toggleTemplates: PropTypes.func,
    Info: PropTypes.func,
    Revisions: PropTypes.func,
    type: PropTypes.string.isRequired,
    template: PropTypes.object
  };

  getInitState () {
    const {location} = this.props;
    return {
      build: !!location.query.build
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
    const {title, slug, updateTitle, updateSlug, sidebar, toggleRevisions, toggleInfo} = this.props;

    return (
      <ContentHeader smallPadding ref='header'>
        <div className={styles.info}>
          <EditableTitle value={title} onSubmit={updateTitle} big={!slug} />
          {slug && <EditableTitle sub value={slug} onSubmit={updateSlug} />}
        </div>
        <ContentHeaderActions>
          {this.renderTemplatePicker()}
          <button
            className={cx(styles.actionButton, sidebar === 'revisions' && styles.active)}
            onClick={toggleRevisions}
          >
            <i className='nc-icon-outline ui-2_time'></i>
          </button>
          <button
            className={cx(styles.actionButton, sidebar === 'info' && styles.active)}
            onClick={toggleInfo}
          >
            <i className='nc-icon-outline travel_info'></i>
          </button>
        </ContentHeaderActions>
      </ContentHeader>
    );
  }

  renderTemplatePicker () {
    const {toggleTemplates, sidebar, template} = this.props;

    if (toggleTemplates) {
      const opened = sidebar === 'templates';
      const title = template && template.title || 'None selected';
      return (
        <div className={styles.templatePicker} onClick={toggleTemplates}>
          <div className={styles.tpLabel}>Template:</div>
          <div className={cx(styles.tpValue, !template && styles.none)}>
            {title}
          </div>
          <i className={cx('nc-icon-mini', opened ? 'arrows-1_minimal-up' : 'arrows-1_minimal-down')} />
        </div>
      );
    }
  }

  renderSidebar () {
    const {sidebar} = this.props;
    const opened = sidebar !== null && !this.props.location.query.build;

    return (
      <ContentSidebar opened={opened}>
        {this.renderSidebarContent()}
      </ContentSidebar>
    );
  }

  renderSidebarContent () {
    const {sidebar, Info, Revisions} = this.props;
    let result;

    if (sidebar === 'info' && Info) {
      result = (
        <Info />
      );
    } else if (sidebar === 'revisions' && Revisions) {
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
