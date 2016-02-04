import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import A from '../../a';
import Animate from '../../animate';

export default class Entry extends Component {

  static propTypes = {
    entry: PropTypes.object.isRequired,
    subitem: PropTypes.bool.isRequired,
    classMap: PropTypes.object,
    classes: PropTypes.object,
    pageBuilder: PropTypes.object
  }

  getInitState () {
    return {
      opened: false
    };
  }

  componentWillUnmount () {
    clearTimeout(this.closeTimeout);
  }

  onMouseOver (event) {
    clearTimeout(this.closeTimeout);
    this.setState({
      opened: true
    });
  }

  onMouseOut (event) {
    this.closeTimeout = setTimeout(::this.close, 400);
  }

  close () {
    this.setState({
      opened: false
    });
  }

  render () {
    let label;
    let href;

    if (this.props.entry.type === 'page') {
      label = this.props.entry.page && this.props.entry.page.title;
      href = '/' + (this.props.entry.page && this.props.entry.page.slug);
    } else if (this.props.entry.type === 'link') {
      label = this.props.entry.link.label;
      href = this.props.entry.link.url;
    }

    const className = cx(
      !this.props.subitem ? this.props.classes.menuItem : this.props.classes.submenuItem,
      !this.props.subitem ? this.props.classMap.entry : this.props.classMap.submenuEntry
    );

    return (
      <li className={className} onMouseEnter={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseOut.bind(this)}>
        {this.renderEntryLink(href, label)}
        {this.renderEntryChildren()}
      </li>
    );
  }

  renderEntryChildren () {
    // This menu only supports 2 levels
    if (!this.props.subitem && this.props.entry.children && this.props.entry.children.length > 0 && this.state.opened) {
      return (
        <Animate transition='fadeIn'>
          <ul className={cx(this.props.classes.submenu, this.props.classMap.submenu)}>
            {this.props.entry.children.map(this.renderEntry, this)}
          </ul>
        </Animate>
      );
    }
  }

  renderEntry (entry) {
    return (
      <Entry
        entry={entry}
        subitem
        classMap={this.props.classMap}
        classes={this.props.classes}
        key={entry.id}
        pageBuilder={this.props.pageBuilder}
      />
    );
  }

  renderEntryLink (href, label) {
    let result;

    const linkClasses = cx(
      !this.props.subitem ? this.props.classes.button : this.props.classes.submenuButton,
      !this.props.subitem ? this.props.classMap.button : this.props.classMap.submenuButton
    );

    if (this.props.pageBuilder && this.props.pageBuilder.editing) {
      result = (
        <a className={linkClasses} href='' onClick={(event) => event.preventDefault()}>
          {label}
        </a>
      );
    } else {
      result = (
        <A className={linkClasses} href={href}>
          {label}
        </A>
      );
    }

    return result;
  }
}
