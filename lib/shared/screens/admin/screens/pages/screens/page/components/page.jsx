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

import styles from './page.less';
import Info from './info';
import Revisions from './revisions';

export default class Page extends Component {
  static fragments = {
    page: {
      _id: 1,
      title: 1,
      slug: 1
    }
  };

  static propTypes = {
    page: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    updateTitle: PropTypes.func.isRequired,
    updateSlug: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    togglePageInfo: PropTypes.func.isRequired,
    togglePageRevisions: PropTypes.func.isRequired,
    pageId: PropTypes.string.isRequired,
    sidebar: PropTypes.string
  };

  static defaultProps = {
    page: {}
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

    if (this.props.pageId !== nextProps.pageId) {
      this.setState({
        build: location.query.build && true
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
    const {loading, page} = this.props;
    let result;

    if (loading) {
      result = (
        <ContentLoading />
      );
    } else if (page) {
      result = this.renderContent();
    } else {
      result = <span></span>;
    }

    return result;
  }

  renderContent () {
    const {page, location, updateTitle, updateSlug, togglePageInfo, togglePageRevisions, sidebar} = this.props;

    return (
      <Animate transition='fadeIn'>
        <div className={cx(this.state.build && styles.build)}>
          <ContentHeader smallPadding ref='header'>
            <div className={styles.info}>
              <EditableTitle value={page.title} onSubmit={updateTitle} />
              <EditableTitle sub value={page.slug} onSubmit={updateSlug} />
            </div>
            <ContentHeaderActions>
              <button
                className={cx(styles.actionButton, sidebar === 'revisions' && styles.active)}
                onClick={togglePageRevisions}
              >
                <i className='nc-icon-outline ui-2_time'></i>
              </button>
              <button
                className={cx(styles.actionButton, sidebar === 'info' && styles.active)}
                onClick={togglePageInfo}
              >
                <i className='nc-icon-outline travel_info'></i>
              </button>
            </ContentHeaderActions>
          </ContentHeader>
          <div className={styles.content} ref='content'>
            <PageBuilder />
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
    const {sidebar} = this.props;
    let result;

    if (sidebar === 'info') {
      result = (
        <Info />
      );
    } else if (sidebar === 'revisions') {
      result = (
        <Revisions />
      );
    }

    return result;
  }
}
