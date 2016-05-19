import cx from 'classnames';
import A from 'components/a';
import Animate from 'components/animate';
import Component from 'components/component';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentLoading from 'components/content-loading';
import EditableTitle from 'components/editable-title';
import PageBuilder from 'components/page-builder';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class ContentPageBuilder extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    title: PropTypes.string,
    slug: PropTypes.string,
    updateTitle: PropTypes.func.isRequired,
    updateSlug: PropTypes.func.isRequired,
    sidebar: PropTypes.string,
    location: PropTypes.object.isRequired,
    toggleRevisions: PropTypes.func.isRequired,
    toggleInfo: PropTypes.func.isRequired
  };

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
    const {location} = this.props;

    return (
      <Animate transition='fadeIn'>
        <div className={cx(this.state.build && styles.build)}>
          {this.renderHeader()}
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

  renderHeader () {
    const {title, slug, updateTitle, updateSlug, sidebar, toggleRevisions, toggleInfo} = this.props;

    return (
      <ContentHeader smallPadding ref='header'>
        <div className={styles.info}>
          <EditableTitle value={title} onSubmit={updateTitle} />
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
}
