import bind from 'decorators/bind';
import cx from 'classnames';
import Balloon from 'components/balloon';
import Button from 'components/button';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class OptionOverrides extends Component {
  static propTypes = {
    elementOverride: PropTypes.bool,
    displayOverride: PropTypes.bool,
    onChange: PropTypes.func.isRequired
  };

  getInitState () {
    return {
      opened: false
    };
  }

  @bind
  toggleOpened () {
    this.setState({
      opened: !this.state.opened
    });
  }

  @bind
  onClick (event) {
    event.preventDefault();
    event.stopPropagation();
    this.toggleOpened();
  }

  @bind
  onRevertElement () {
    const {onChange} = this.props;
    onChange(undefined);
  }

  @bind
  onRevertDisplay () {
    const {onChange} = this.props;
    onChange(null);
  }

  render () {
    const {displayOverride, elementOverride} = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.toggle} onClick={this.onClick} ref='toggle'>
          {
            displayOverride &&
            <div className={styles.display} />
          }
          {
            elementOverride &&
            <div className={cx(styles.element, displayOverride && styles.elementDisplay)} />
          }
        </div>
        {this.renderOpened()}
      </div>
    );
  }

  renderOpened () {
    if (this.state.opened) {
      return (
        <Balloon
          element={this.refs.toggle}
          small
          stickOptions={{
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            horizontalOffset: 0,
            verticalOffset: 8,
            onClose: this.toggleOpened
          }}
        >
          {this.renderContent()}
        </Balloon>
      );
    }
  }

  renderContent () {
    const {elementOverride} = this.props;
    let result;

    if (elementOverride) {
      result = (
        <div className={styles.content}>
          <div className={cx(styles.element, styles.noBorder)} />
          <span className={styles.label}>
            Overriden for selected element
          </span>
          <Button
            primary
            bordered
            noBackground
            small
            className={styles.button}
            onClick={this.onRevertElement}
          >
            Reset this property
          </Button>
        </div>
      );
    } else {
      result = (
        <div className={styles.content}>
          <div className={cx(styles.display, styles.noBorder)} />
          <span className={styles.label}>
            Overriden for current display
          </span>
          <Button
            primary
            bordered
            noBackground
            small
            className={styles.button}
            onClick={this.onRevertDisplay}
          >
            Reset this property
          </Button>
        </div>
      );
    }

    return result;
  }
}
