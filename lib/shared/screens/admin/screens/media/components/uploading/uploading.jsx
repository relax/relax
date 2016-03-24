import velocity from 'velocity-animate';
import Animate from 'components/animate';
import Component from 'components/component';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './uploading.less';
import Item from './item';

export default class Uploading extends Component {
  static propTypes = {
    uploads: PropTypes.array.isRequired,
    opened: PropTypes.bool.isRequired,
    toggleOpened: PropTypes.func.isRequired
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.opened !== nextProps.opened) {
      const config = {
        duration: 500,
        easing: 'easeOutExpo'
      };

      if (nextProps.opened) {
        velocity(this.refs.root, {translateY: '0%'}, config);
      } else {
        velocity(this.refs.root, {translateY: '100%'}, config);
      }
    }
  }

  render () {
    const {uploads, toggleOpened} = this.props;
    const uploadsFinished = uploads.reduce((previousValue, current) => {
      const isFinished = current.status !== 'queue' && current.status !== 'uploading';
      return previousValue + (isFinished ? 1 : 0);
    }, 0);
    return (
      <Animate>
        <div className={styles.root} ref='root'>
          <div className={styles.header} onClick={toggleOpened}>
            <span className={styles.title}>Uploads</span>
            <span className={styles.progress}>
              <span>{uploadsFinished}</span>
              <span> / </span>
              <span>{uploads.length}</span>
            </span>
          </div>
          <Scrollable className={styles.list}>
            <div className={styles.listContent}>
              {uploads.map(this.renderUpload, this)}
            </div>
          </Scrollable>
        </div>
      </Animate>
    );
  }

  renderUpload (item) {
    return (
      <Item {...item} key={item.id} />
    );
  }
}
