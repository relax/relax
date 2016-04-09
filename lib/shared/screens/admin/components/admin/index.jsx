import cx from 'classnames';
import forEach from 'lodash.foreach';
import velocity from 'velocity-animate';
import Component from 'components/component';
import PageBuilderMenu from 'components/page-builder-menu';
import React, {PropTypes} from 'react';

import styles from './index.less';
import Menu from '../menu';
import TopBar from '../top-bar';

export default class Admin extends Component {
  static propTypes = {
    children: PropTypes.node,
    routes: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired
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
        velocity.hook(this.refs.content, 'translateX', '0px');
        velocity(this.refs.content, {translateX: '-290px'}, config);
      } else {
        velocity.hook(this.refs.content, 'translateX', '-290px');
        velocity(this.refs.content, {translateX: '0px'}, config);
      }
    }
  }

  render () {
    return (
      <div className={styles.root}>
        <TopBar />
        <div className={cx(styles.content, this.state.build && styles.build)} ref='content'>
          <Menu>
            {this.renderMenuContent()}
          </Menu>
          <div className={styles.pageContent}>
            {this.props.children}
          </div>
          <PageBuilderMenu />
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
