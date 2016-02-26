import cx from 'classnames';
import A from 'components/a';
import Component from 'components/component';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import EditableTitle from 'components/editable-title';
import PageBuilder from 'components/page-builder';
import Velocity from 'velocity-animate';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import styles from './page.less';

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
    updateSlug: PropTypes.func.isRequired
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

    if (oldBuild !== currentBuild) {
      const config = {
        duration: 800,
        display: null,
        easing: 'easeOutExpo'
      };
      if (currentBuild) {
        Velocity(this.refs.content, {top: '0px'}, config);
        // Velocity(findDOMNode(this.refs.header), {translateY: '-70px'}, config);
        Velocity(findDOMNode(this.refs.cover), {opacity: 0}, Object.assign({}, config, {display: 'none'}));
      } else {
        Velocity(this.refs.content, {top: '70px'}, config);
        // Velocity(findDOMNode(this.refs.header), {translateY: '0px'}, config);
        Velocity(findDOMNode(this.refs.cover), {opacity: 1}, Object.assign({}, config, {display: 'block'}));
      }
    }
  }

  render () {
    const {page, location, updateTitle, updateSlug} = this.props;

    return (
      <div className={cx(this.state.build && styles.build)}>
        <ContentHeader smallPadding ref='header'>
          <div className={styles.info}>
            <EditableTitle value={page.title} onSubmit={updateTitle} />
            <EditableTitle sub value={page.slug} onSubmit={updateSlug} />
          </div>
          <ContentHeaderActions>
            <button className={styles.actionButton}>
              <i className='nc-icon-outline ui-2_time'></i>
            </button>
            <button className={styles.actionButton}>
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
        </div>
      </div>
    );
  }
}
