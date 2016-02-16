import A from 'components/a';
import Component from 'components/component';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
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
    location: PropTypes.object.isRequired
  };

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
        Velocity(findDOMNode(this.refs.header), {translateY: '-70px'}, config);
        Velocity(findDOMNode(this.refs.cover), {opacity: 0}, config);
      } else {
        Velocity(this.refs.content, {top: '70px'}, config);
        Velocity(findDOMNode(this.refs.header), {translateY: '0px'}, config);
        Velocity(findDOMNode(this.refs.cover), {opacity: 100}, config);
      }
    }
  }

  render () {
    const {page, location} = this.props;

    return (
      <div>
        <ContentHeader smallPadding ref='header'>
          <div className={styles.info}>
            <div className={styles.title}>{page.title}</div>
            <div className={styles.slug}>/{page.slug}</div>
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
