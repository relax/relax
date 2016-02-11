import cx from 'classnames';
import Component from 'components/component';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './menu.less';
import Button from './button';
import ContentTypes from './content-types';
import User from './user';

export default class Menu extends Component {
  static fragments = ContentTypes.fragments;

  static propTypes = {
    active: PropTypes.string,
    opened: PropTypes.bool,
    menuData: PropTypes.array.isRequired,
    schemas: PropTypes.array.isRequired,
    children: PropTypes.node
  };

  static defaultProps = {
    opened: false
  };

  render () {
    const {menuData, schemas, opened} = this.props;
    return (
      <div className={cx(styles.root, opened && styles.opened)}>
        <div className={styles.menu}>
          <Scrollable className={styles.menuContent}>
            {menuData.map(this.renderEntry, this)}
            <ContentTypes schemas={schemas} key='content-types' />
          </Scrollable>
          <User user={{name: 'Bruno Mota', email: 'bruno12mota@gmail.com'}} />
        </div>
        <div className={styles.list}>
          {this.props.children}
        </div>
      </div>
    );
  }

  renderEntry (entry, key) {
    let result;
    if (entry === 'sep') {
      result = <div className={styles.sepperator}/>;
    } else {
      result = (
        <Button {...entry} active={this.props.active === entry.label} key={key} />
      );
    }
    return result;
  }
}
