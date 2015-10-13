import React from 'react';
import {Component} from 'relax-framework';
import cx from 'classnames';

import A from '../../a';

export default class Tab extends Component {
  static fragments = {
    tab: {
      _id: {
        _id: 1
      },
      page: {
        title: 1,
        slug: 1
      },
      userSchema: {
        title: 1,
        slug: 1
      },
      schemaEntry: {
        schemaSlug: 1,
        title: 1,
        slug: 1
      }
    }
  }

  static propTypes = {
    activePanelType: React.PropTypes.string,
    tab: React.PropTypes.object,
    tabsCount: React.PropTypes.number,
    page: React.PropTypes.object,
    schema: React.PropTypes.object,
    schemaEntry: React.PropTypes.object
  }

  onCloseTab (_id, active, event) {
    event.preventDefault();
    event.stopPropagation();
  }

  render () {
    const {tab} = this.props;
    let active = this.props.activePanelType === 'pageBuild';
    let slug;
    let title;
    let link;

    if (tab.page) {
      slug = tab.page.slug;
      title = tab.page.title;
      active = active && this.props.page && this.props.page.slug === slug;
      link = '/admin/page/' + slug;
    } else if (tab.userSchema) {
      slug = tab.userSchema.slug;
      title = tab.userSchema.title + ' (template)';
      active = active && this.props.schema && this.props.schema.slug === slug && !this.props.schemaEntry;
      link = '/admin/schemas/' + slug + '/template';
    } else if (tab.schemaEntry) {
      slug = tab.schemaEntry.slug;
      title = tab.schemaEntry.title;
      active = active && this.props.schemaEntry && this.props.schema && this.props.schemaEntry._slug === slug && this.props.schema.slug === tab.schemaEntry.schemaSlug;
      link = '/admin/schema/' + tab.schemaEntry.schemaSlug + '/' + slug + '/single';
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
