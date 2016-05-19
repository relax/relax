import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import styles from './tab.less';

export default class Tab extends Component {
  static fragments = {
    tab: {
      _id: 1,
      type: 1,
      item: {
        _id: 1,
        title: 1
      }
    }
  };

  static propTypes = {
    activePanelType: PropTypes.string,
    tab: PropTypes.object,
    tabsCount: PropTypes.number,
    removeTab: PropTypes.func,
    pathname: PropTypes.string.isRequired
  };

  @bind
  onCloseTab (event) {
    event.preventDefault();
    event.stopPropagation();
    const {tab = {}, pathname, removeTab} = this.props;
    const to = this.getLink();
    const active = pathname === to;

    removeTab(tab._id, active && to);
  }

  getLink () {
    const {tab = {}} = this.props;
    const {item = {}} = tab;

    let to;
    switch (tab.type) {
      case 'page':
        to = `/admin/pages/${item._id}`;
        break;
      case 'template':
        to = `/admin/templates/${item._id}`;
        break;
      case 'schema':
        to = `/admin/schemas/${item._id}`;
        break;
      default:
        to = '#';
    }

    return to;
  }

  render () {
    const {tab = {}, pathname} = this.props;
    const {item = {}} = tab;
    const to = this.getLink();

    const active = pathname === to;
    const deduct = 35 / this.props.tabsCount;
    const style = {
      maxWidth: `calc(${100 / this.props.tabsCount}% - ${deduct}px)`
    };

    return (
      <Link to={to} query={{build: 1}} className={cx(styles.tab, active && styles.active)} style={style}>
        <span>{item.title}</span>
        <span className={styles.close} onClick={this.onCloseTab}>
          <i className='nc-icon-mini ui-1_simple-remove'></i>
        </span>
      </Link>
    );
  }
}
