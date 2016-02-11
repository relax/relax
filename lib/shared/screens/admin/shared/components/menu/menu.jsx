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
    menuData: PropTypes.array.isRequired,
    schemas: PropTypes.array.isRequired
  };

  render () {
    const {menuData, schemas} = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.menu}>
          <Scrollable className={styles.menuContent}>
            {menuData.map(this.renderEntry, this)}
            <ContentTypes schemas={schemas} key='content-types' />
          </Scrollable>
          <User user={{name: 'Bruno Mota', email: 'bruno12mota@gmail.com'}} />
        </div>
        <div className={styles.list}>

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
