import Component from 'components/component';
import Menu from 'components/menu';
import React, {PropTypes} from 'react';

import styles from './index.less';
import TopBar from '../top-bar';

export default class Admin extends Component {
  static propTypes = {
    children: PropTypes.node,
    routes: PropTypes.array.isRequired
  };

  render () {
    return (
      <div className={styles.root}>
        <TopBar />
        <div className={styles.content}>
          <Menu {...this.props}>
            {this.renderMenuContent()}
          </Menu>
          {this.props.children}
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
