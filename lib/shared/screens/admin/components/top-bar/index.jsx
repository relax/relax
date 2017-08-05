import Component from 'components/component';
import velocity from 'relax-velocity-animate';
import React from 'react';
import PropTypes from 'prop-types';

import Actions from './actions';
import styles from './index.less';

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
        velocity(this.refs.content, {translateY: '-35px'}, config);
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
        </div>
        <div className={styles.closePreview} ref='preview' onClick={toggleEditing}>
          Close preview
        </div>
      </div>
    );
  }
}
