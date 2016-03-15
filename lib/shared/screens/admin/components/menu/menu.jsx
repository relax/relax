import cx from 'classnames';
import Button from 'components/menu-button';
import Component from 'components/component';
import Scrollable from 'components/scrollable';
import velocity from 'velocity-animate';
import React, {PropTypes} from 'react';

import styles from './menu.less';
import ContentTypes from './content-types';
import User from './user';

export default class Menu extends Component {
  static fragments = ContentTypes.fragments;

  static propTypes = {
    active: PropTypes.string,
    opened: PropTypes.bool,
    menuData: PropTypes.array.isRequired,
    schemas: PropTypes.array.isRequired,
    onActiveClick: PropTypes.func.isRequired,
    children: PropTypes.node
  };

  static defaultProps = {
    opened: false
  };

  getInitState () {
    return {
      opened: this.props.opened
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.opened !== this.props.opened) {
      const config = {
        duration: 800,
        display: null,
        easing: 'easeOutExpo'
      };
      if (nextProps.opened) {
        velocity.hook(this.refs.menu, 'translateX', '0%');
        velocity.hook(this.refs.content, 'translateX', '100%');
        velocity(this.refs.menu, {translateX: '-100%'}, config);
        velocity(this.refs.content, {translateX: '0%'}, config);
      } else {
        velocity.hook(this.refs.menu, 'translateX', '-100%');
        velocity.hook(this.refs.content, 'translateX', '0%');
        velocity(this.refs.menu, {translateX: '0%'}, config);
        velocity(this.refs.content, {translateX: '100%'}, config);
      }
    }
  }

  render () {
    const {menuData, schemas} = this.props;
    return (
      <div className={cx(styles.root, this.state.opened && styles.opened)}>
        <div className={styles.menu} ref='menu'>
          <Scrollable className={styles.menuContent}>
            {menuData.map(this.renderEntry, this)}
            <ContentTypes schemas={schemas} key='content-types' />
          </Scrollable>
        </div>
        <div className={styles.content} ref='content'>
          {this.props.children}
        </div>
        <User user={{name: 'Bruno Mota', email: 'bruno12mota@gmail.com'}} />
      </div>
    );
  }

  renderEntry (entry, key) {
    let result;
    if (entry === 'sep') {
      result = <div className={styles.sepperator}/>;
    } else {
      result = (
        <Button {...entry} active={this.props.active === entry.label} key={key} onActiveClick={this.props.onActiveClick} />
      );
    }
    return result;
  }
}
