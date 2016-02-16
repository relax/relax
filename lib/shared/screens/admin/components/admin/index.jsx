import Component from 'components/component';
import PageBuilderMenu from 'components/page-builder-menu';
import Velocity from 'velocity-animate';
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
        Velocity(this.refs.content, {translateX: '-290px'}, config);
      } else {
        Velocity(this.refs.content, {translateX: '0px'}, config);
      }
    }
  }

  render () {
    return (
      <div className={styles.root}>
        <TopBar />
        <div className={styles.content} ref='content'>
          <Menu>
            {this.renderMenuContent()}
          </Menu>
          {this.props.children}
          <PageBuilderMenu />
        </div>
      </div>
    );
  }

  renderMenuContent () {
    if (this.props.routes.length >= 2 && this.props.routes[1].menu) {
      const MenuTag = this.props.routes[1].menu;
      return <MenuTag />;
    }
  }
}
