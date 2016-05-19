import cx from 'classnames';
import velocity from 'velocity-animate';
import A from 'components/a';
import Animate from 'components/animate';
import Component from 'components/component';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentLoading from 'components/content-loading';
import ContentSidebar from 'components/content-sidebar';
import EditableTitle from 'components/editable-title';
import PageBuilder from 'components/page-builder';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import styles from './index.less';

export default class ContentPageBuilder extends Component {
  static propTypes = {
    itemId: PropTypes.string,
    loading: PropTypes.bool,
    title: PropTypes.string,
    slug: PropTypes.string,
    updateTitle: PropTypes.func.isRequired,
    updateSlug: PropTypes.func.isRequired,
    sidebar: PropTypes.string,
    location: PropTypes.object.isRequired,
    toggleRevisions: PropTypes.func.isRequired,
    toggleInfo: PropTypes.func.isRequired,
    Info: PropTypes.object,
    Revisions: PropTypes.object,
    type: PropTypes.string.isRequired
  };

  getInitState () {
    const {location} = this.props;
    return {
      build: location.query.build && true
    };
  }

  componentWillReceiveProps (nextProps) {
    const {location} = this.props;
    const oldBuild = location.query.build;
    const currentBuild = nextProps.location.query.build;

    if (this.props.itemId !== nextProps.itemId) {
      this.setState({
        build: currentBuild && true
      });
    }

    if (oldBuild !== currentBuild) {
      const config = {
        duration: 800,
        display: null,
        easing: 'easeOutExpo'
      };
      if (currentBuild) {
        velocity(this.refs.content, {top: '0px'}, config);
        // velocity(findDOMNode(this.refs.header), {translateY: '-70px'}, config);
        velocity(findDOMNode(this.refs.cover), {opacity: 0}, Object.assign({}, config, {display: 'none'}));
      } else {
        velocity(this.refs.content, {top: '70px'}, config);
        // velocity(findDOMNode(this.refs.header), {translateY: '0px'}, config);
        velocity(findDOMNode(this.refs.cover), {opacity: 1}, Object.assign({}, config, {display: 'block'}));
      }
    }
  }

  render () {
    const {loading} = this.props;
    let result;

    if (loading) {
      result = (
        <ContentLoading />
      );
    } else {
      result = this.renderContent();
    }

    return result;
  }

  renderContent () {
    const {location, type} = this.props;

    return (
      <Animate transition='fadeIn'>
        <div className={cx(this.state.build && styles.build)}>
          {this.renderHeader()}
          <div className={styles.content} ref='content'>
            <PageBuilder type={type} />
            <A href={location.pathname} query={{build: 1}} className={styles.cover} ref='cover'>
              <div className={styles.coverContent}>
                <i className='nc-icon-outline design_design'></i>
                <div>Click to Build</div>
              </div>
            </A>
            {this.renderSidebar()}
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
    }

    return result;
  }
}
