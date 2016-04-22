import Button from 'components/button';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './sidebar.less';
import Selected from './selected';

export default class MediaSelectorSidebar extends Component {
  static propTypes = {
    selected: PropTypes.string
  };

  render () {
    const {selected} = this.props;
    return (
      <div>
        <div className={styles.header}>Media Selector</div>
        <div>
          <Selected selected={selected} />
        </div>
        <div className={styles.done}>
          <Button primary full>Done</Button>
        </div>
      </div>
    );
  }
}
