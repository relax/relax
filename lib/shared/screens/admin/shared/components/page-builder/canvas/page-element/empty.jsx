import Animate from 'components/animate';
import Component from 'components/component';
import bind from 'decorators/bind';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './empty.less';

export default class Empty extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    element: PropTypes.object.isRequired,
    spotClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool
  };

  @bind
  onClick () {
    this.props.spotClick(0, this.refs.button);
  }

  render () {
    const {isActive, element} = this.props;
    let result;

    if (element.id === 'Body') {
      result = this.renderBody();
    } else {
      result = (
        <div className={cx(styles.root, isActive && styles.active)}>
          {isActive ? this.renderActive() : this.renderNormal()}
        </div>
      );
    }

    return result;
  }

  renderBody () {
    return (
      <div className={styles.body}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Let's get you started</div>
          <div className={styles.subTitle}>Click the blue dot below to add your first element</div>
          <button className={styles.button} onClick={this.onClick} ref='button'>
            <i className='nc-icon-mini ui-1_simple-add'></i>
          </button>
        </div>
      </div>
    );
  }

  renderNormal () {
    const {settings, element} = this.props;
    return (
      <Animate transition='slideUpIn' key='info'>
        <div>
          <div className={styles.info}>
            <i className={settings.icon.class}>{settings.icon.content}</i>
            <span>{`${element.label || element.tag} is empty`}</span>
          </div>
          <div className={styles.actions}>
            <span>Drop elements here or </span>
            <button className={styles.addButton} onClick={this.onClick} ref='button'>click to add</button>
          </div>
        </div>
      </Animate>
    );
  }

  renderActive () {
    return (
      <Animate transition='slideDownIn' key='drop'>
        <div>
          <i className={cx('nc-icon-outline weather_drop-12', styles.dropIcon)} />
        </div>
      </Animate>
    );
  }
}
