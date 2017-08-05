import bind from 'decorators/bind';
import Component from 'components/component';
import Portal from 'components/portal';
import Stick from 'components/stick';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './index.less';

export default class Tooltip extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    maxWidth: PropTypes.number,
    dark: PropTypes.bool
  };

  getInitState () {
    return {
      showing: false
    };
  }

  @bind
  showTooltip () {
    this.setState({
      showing: true
    });
  }

  hideTooltip () {
    this.setState({
      showing: false
    });
  }

  @bind
  onMouseEnter () {
    this.timeout = setTimeout(this.showTooltip, 1000);
  }

  @bind
  onMouseLeave () {
    clearTimeout(this.timeout);
    this.hideTooltip();
  }

  render () {
    const {className, style, children, ...props} = this.props;

    return (
      <div
        className={className || styles.root}
        style={style}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        ref='holder'
        {...props}
      >
        {children}
        {this.renderTooltip()}
      </div>
    );
  }

  renderTooltip () {
    if (this.state.showing) {
      const {label, maxWidth, dark} = this.props;
      const tooltipStyle = {
        maxWidth
      };

      return (
        <Portal>
          <Stick
            element={this.refs.holder}
            verticalPosition='bottom'
            horizontalPosition='center'
            verticalOffset={5}
          >
            <div className={cx(styles.tooltip, dark && styles.dark)} style={tooltipStyle}>
              {label}
            </div>
          </Stick>
        </Portal>
      );
    }
  }
}
