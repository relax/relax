import velocity from 'velocity-animate';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './menu.less';
import Breadcrumbs from './breadcrumbs';
import Tabs from './tabs';

export default class PageBuilderMenu extends Component {
  static propTypes = {
    editing: PropTypes.bool.isRequired,
    previewing: PropTypes.bool.isRequired
  };

  componentWillReceiveProps (nextProps) {
    const config = {
      duration: 800,
      display: null,
      easing: 'easeOutExpo'
    };

    if (nextProps.previewing !== this.props.previewing) {
      if (nextProps.previewing) {
        velocity(this.refs.content, {translateX: '290px'}, config);
      } else {
        velocity(this.refs.content, {translateX: '0px'}, config);
      }
    }
  }

  render () {
    return (
      <div className={styles.root} ref='content'>
        <div className={styles.content}>
          <Tabs />
        </div>
        <Breadcrumbs className={styles.breadcrumbs} />
      </div>
    );
  }
}
