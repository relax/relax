import Component from 'components/component';
import velocity from 'relax-velocity-animate';
import React from 'react';
import PropTypes from 'prop-types';

import Actions from './actions';
import Breadcrumbs from './breadcrumbs';
import Tabs from './tabs';
import styles from './menu.less';

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
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <Tabs />
          </div>
          <Breadcrumbs className={styles.breadcrumbs} />
        </div>
        <Actions />
      </div>
    );
  }
}
