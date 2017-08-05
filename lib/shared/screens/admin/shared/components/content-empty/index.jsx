import Animate from 'components/animate';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

export default class ContentEmpty extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  render () {
    const {name} = this.props;

    return (
      <div className={styles.empty}>
        <Animate>
          <i className='nc-icon-outline media-1_touch'></i>
        </Animate>
        <div className={styles.textAlert}>
          Relax, nothing selected yet!
        </div>
        <div className={styles.text}>
          {`Select a ${name} from the menu on the left`}
        </div>
      </div>
    );
  }
}
