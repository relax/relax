import cx from 'classnames';
import A from 'components/a';
import Animate from 'components/animate';
import Component from 'components/component';
import React, {PropTypes} from 'react';

export default class Entry extends Component {

  static propTypes = {
    entry: PropTypes.object.isRequired,
    subitem: PropTypes.bool.isRequired,
    styleClassMap: PropTypes.object,
    classes: PropTypes.object
  };

  getInitState () {
    return {
      opened: false
    };
  }

  componentWillUnmount () {
    clearTimeout(this.closeTimeout);
  }

  onMouseOver () {
    clearTimeout(this.closeTimeout);
    this.setState({
      opened: true
    });
  }

  onMouseOut () {
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
      href = `/${this.props.entry.page && this.props.entry.page.slug}`;
    } else if (this.props.entry.type === 'link') {
      label = this.props.entry.link.label;
      href = this.props.entry.link.url;
    }

    const className = cx(
      !this.props.subitem ? this.props.classes.menuItem : this.props.classes.submenuItem,
      !this.props.subitem ? this.props.styleClassMap.entry : this.props.styleClassMap.submenuEntry
    );

    return (
      <li
        className={className}
        onMouseEnter={::this.onMouseOver}
        onMouseLeave={::this.onMouseOut}
      >
        {this.renderEntryLink(href, label)}
        {this.renderEntryChildren()}
      </li>
    );
  }

  renderEntryChildren () {
    // This menu only supports 2 levels
    if (!this.props.subitem &&
        this.props.entry.children &&
        this.props.entry.children.length > 0 &&
        this.state.opened) {
      return (
        <Animate transition='fadeIn'>
          <ul className={cx(this.props.classes.submenu, this.props.styleClassMap.submenu)}>
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
        styleClassMap={this.props.styleClassMap}
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
      !this.props.subitem ? this.props.styleClassMap.button : this.props.styleClassMap.submenuButton
    );

    if (this.props.pageBuilder && this.props.pageBuilder.editing) {
      result = (
        <a className={linkClasses}>
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
