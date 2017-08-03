import Component from 'components/component';
import PageBuilderMenu from 'components/page-builder-menu';
import cx from 'classnames';
import forEach from 'lodash/forEach';
import velocity from 'relax-velocity-animate';
import React from 'react';
import PropTypes from 'prop-types';

import Menu from '../menu';
import TopBar from '../top-bar';
import styles from './index.less';

export default class Admin extends Component {
  static propTypes = {
    children: PropTypes.node,
    routes: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    previewing: PropTypes.bool.isRequired,
    toggleEditing: PropTypes.func.isRequired
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
    const config = {
      duration: 800,
      display: null,
      easing: 'easeOutExpo'
    };

    if (oldBuild !== currentBuild) {
      if (currentBuild) {
        velocity.hook(this.refs.content, 'translateX', '0px');
        velocity(this.refs.content, {translateX: '-290px'}, config);
      } else {
        velocity.hook(this.refs.content, 'translateX', '-290px');
        velocity(this.refs.content, {translateX: '0px'}, config);
      }
    }

    if (nextProps.previewing !== this.props.previewing) {
      if (nextProps.previewing) {
        velocity(this.refs.content, {top: '0px'}, config);
      } else {
        velocity(this.refs.content, {top: '35px'}, config);
      }
    }
  }

  render () {
    const {previewing, toggleEditing} = this.props;
    return (
      <div className={styles.root}>
        <TopBar previewing={previewing} toggleEditing={toggleEditing} />
        <div className={cx(styles.content, this.state.build && styles.build)} ref='content'>
          <Menu>
            {this.renderMenuContent()}
          </Menu>
          <div className={cx(styles.pageContent, previewing && styles.pagePreviewing)}>
            {this.props.children}
          </div>
          <PageBuilderMenu previewing={previewing} />
        </div>
      </div>
    );
  }

  renderMenuContent () {
    const {routes} = this.props;
    if (routes.length >= 2) {
      let MenuTag = false;
      forEach(routes, route => {
        if (route.menu) {
          MenuTag = route.menu;
        }
      });

      if (MenuTag) {
        return <MenuTag />;
      }
    }
  }
}
