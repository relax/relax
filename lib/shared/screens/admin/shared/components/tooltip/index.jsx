import bind from 'decorators/bind';
import Component from 'components/component';
import Portal from 'components/portal';
import Stick from 'components/stick';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class Tooltip extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string
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
    const {className} = this.props;

    return (
      <div
        className={className || styles.root}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        ref='holder'
      >
        {this.props.children}
        {this.renderTooltip()}
      </div>
    );
  }

  renderTooltip () {
    if (this.state.showing) {
      const {label} = this.props;

      return (
        <Portal>
          <Stick
            element={this.refs.holder}
            verticalPosition='bottom'
            horizontalPosition='center'
            verticalOffset={5}
          >
            <div className={styles.tooltip}>
              {label}
            </div>
          </Stick>
        </Portal>
      );
    }
  }
}
