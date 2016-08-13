import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import styles from './index.less';

export default class MenuButton extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onActiveClick: PropTypes.any,
    dark: PropTypes.bool,
    children: PropTypes.node,
    query: PropTypes.object,
    className: PropTypes.string
  };

  static defaultProps = {
    active: false
  };

  getInitState () {
    this.caretToggle = ::this.caretToggle;
    return {
      opened: true
    };
  }

  caretToggle () {
    this.setState({
      opened: !this.state.opened
    });
  }

  onClick (event) {
    if (this.props.active && this.props.onActiveClick) {
      event.preventDefault();
      event.stopPropagation();
      this.props.onActiveClick();
    }
  }

  render () {
    const {link, label, icon, active, dark, query, className} = this.props;
    return (
      <div>
        <div className={cx(styles.buttonHolder, className)}>
          <Link
            to={link}
            query={query}
            className={cx(styles.button, active && styles.active, dark && styles.dark)}
            onClick={::this.onClick}
          >
            <i className={icon}></i>
            <span>{label}</span>
          </Link>
          {this.renderCaret()}
        </div>
        {this.renderChildren()}
      </div>
    );
  }

  renderChildren () {
    const {children} = this.props;
    if (children && this.state.opened) {
      return (
        <div>
          {children}
        </div>
      );
    }
  }

  renderCaret () {
    const {children} = this.props;
    if (children) {
      const {opened} = this.state;
      return (
        <button className={styles.caret} onClick={this.caretToggle}>
          <i
            className={cx(
              'nc-icon-outline',
              opened ? 'arrows-1_small-triangle-up' : 'arrows-1_small-triangle-down'
            )}
          />
        </button>
      );
    }
  }
}
