import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './empty.less';

export default class Empty extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    element: PropTypes.object.isRequired,
    spotClick: PropTypes.func.isRequired
  };

  onClick () {
    this.props.spotClick(0, this.refs.button);
  }

  render () {
    const {settings, element} = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.info}>
          <i className={settings.icon.class}>{settings.icon.content}</i>
          <span>{`${element.label || element.tag} is empty`}</span>
        </div>
        <div className={styles.actions}>
          <span>Drop elements here or </span>
          <button className={styles.addButton} onClick={::this.onClick} ref='button'>click to add</button>
        </div>
      </div>
    );
  }
}
