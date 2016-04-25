import velocity from 'velocity-animate';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';
import Actions from './actions';
import Tabs from './tabs';

export default class TopBar extends Component {
  static propTypes = {
    previewing: PropTypes.bool.isRequired,
    toggleEditing: PropTypes.func.isRequired
  };

  componentWillReceiveProps (nextProps) {
    const config = {
      duration: 800,
      display: null,
      easing: 'easeOutExpo'
    };

    if (nextProps.previewing !== this.props.previewing) {
      if (nextProps.previewing) {
        velocity(this.refs.content, {translateY: '-45px'}, config);
        velocity(this.refs.preview, {translateX: '-110px'}, config);
      } else {
        velocity(this.refs.content, {translateY: '0'}, config);
        velocity(this.refs.preview, {translateX: '-0'}, config);
      }
    }
  }

  render () {
    const {toggleEditing} = this.props;
    return (
      <div>
        <div className={styles.root} ref='content'>
          <Actions />
          <Tabs />
        </div>
        <div className={styles.closePreview} ref='preview' onClick={toggleEditing}>
          Close preview
        </div>
      </div>
    );
  }
}
