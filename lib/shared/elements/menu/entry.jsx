import bind from 'decorators/bind';
import cx from 'classnames';
import A from 'components/a';
import Animate from 'components/animate';
import Component from 'components/component';
import React, {PropTypes} from 'react';

export default class Entry extends Component {

  static propTypes = {
    entry: PropTypes.object.isRequired,
    subitem: PropTypes.bool.isRequired,
    editing: PropTypes.bool,
    styleClassMap: PropTypes.object,
    classes: PropTypes.object,
    children: PropTypes.node
  };

  getInitState () {
    return {
      opened: false
    };
  }

  componentWillUnmount () {
    clearTimeout(this.closeTimeout);
  }

  @bind
  onMouseOver () {
    clearTimeout(this.closeTimeout);
    this.setState({
      opened: true
    });
  }

  @bind
  onMouseOut () {
    this.closeTimeout = setTimeout(this.close, 400);
  }

  @bind
  close () {
    this.setState({
      opened: false
    });
  }

  render () {
    const {entry, subitem, classes, styleClassMap} = this.props;
    const label = entry.label;
    let href = entry.url;

    if (entry.type === 'page') {
      href = `/${entry.page && entry.page.slug}`;
    } else if (entry.type === 'link') {
      href = entry.link.url;
    }

    const className = cx(
      !subitem ? classes.menuItem : classes.submenuItem,
      !subitem ? styleClassMap.entry : styleClassMap.submenuEntry
    );

    return (
      <li
        className={className}
        onMouseEnter={this.onMouseOver}
        onMouseLeave={this.onMouseOut}
      >
        {this.renderEntryLink(href, label)}
        {this.renderEntryChildren()}
      </li>
    );
  }

  renderEntryChildren () {
    const {subitem, children} = this.props;
    const {opened} = this.state;

    // This menu only supports 2 levels
    if (!subitem && children && opened) {
      const {classes, styleClassMap} = this.props;

      return (
        <Animate transition='fadeIn'>
          <ul className={cx(classes.submenu, styleClassMap.submenu)}>
            {children}
          </ul>
        </Animate>
      );
    }
  }

  renderEntryLink (href, label) {
    const {subitem, classes, styleClassMap, editing} = this.props;
    let result;

    const linkClasses = cx(
      !subitem ? classes.button : classes.submenuButton,
      !subitem ? styleClassMap.button : styleClassMap.submenuButton
    );

    if (editing) {
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
