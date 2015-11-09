import cx from 'classnames';
import React from 'react';
import {Component} from 'relax-framework';

import A from '../../a';

export default class Tab extends Component {
  static fragments = {
    tab: {
      _id: {
        _id: 1
      },
      page: {
        _id: 1,
        title: 1
      }
    }
  }

  static propTypes = {
    activePanelType: React.PropTypes.string,
    tab: React.PropTypes.object,
    tabsCount: React.PropTypes.number,
    page: React.PropTypes.object,
    schema: React.PropTypes.object,
    schemaEntry: React.PropTypes.object,
    removeTab: React.PropTypes.func
  }

  onCloseTab (_id, active, event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.removeTab(this.constructor.fragments, _id, active);
  }

  render () {
    const {tab} = this.props;
    const active = tab.selected;
    let _id;
    let title;
    let link;

    if (tab.page) {
      _id = tab.page._id;
      title = tab.page.title;
      link = '/admin/page/' + _id;
    } else if (tab.userSchema) {
      _id = tab.userSchema._id;
      title = tab.userSchema.title + ' (template)';
      link = '/admin/schemas/' + _id + '/template';
    } else if (tab.schemaEntry) {
      _id = tab.schemaEntry._id;
      title = tab.schemaEntry.title;
      link = '/admin/schema/' + tab.schemaEntry.schemaSlug + '/' + _id + '/single';
    }

    const deduct = 35 / this.props.tabsCount;
    const style = {
      maxWidth: 'calc(' + (100 / this.props.tabsCount) + '% - ' + deduct + 'px)'
    };

    return (
      <A href={link} className={cx('tab', active && 'selected')} key={tab._id._id} style={style}>
        <span>{title}</span>
        <span className='close' onClick={this.onCloseTab.bind(this, tab._id, active)}>
          <i className='material-icons'>close</i>
        </span>
      </A>
    );
  }
}
