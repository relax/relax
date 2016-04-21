import velocity from 'velocity-animate';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class ContentSidebar extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    opened: PropTypes.bool.isRequired
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.opened !== nextProps.opened) {
      const config = {
        duration: 800,
        display: null,
        easing: 'easeOutExpo'
      };
      if (nextProps.opened) {
        velocity(this.refs.root, {right: '0px'}, config);
      } else {
        velocity(this.refs.root, {right: '-290px'}, config);
      }
    }
  }

  render () {
    return (
      <div className={styles.root} ref='root'>
        {this.props.children}
      </div>
    );
  }
}
