import Component from 'components/component';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './sidebar.less';
import FamilyButton from './family-button';

export default class Sidebar extends Component {
  static propTypes = {
    icons: PropTypes.array.isRequired,
    selectedFamily: PropTypes.number.isRequired,
    changeSelectedFamily: PropTypes.func.isRequired
  };

  render () {
    const {icons} = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.header}>Icons</div>
        <Scrollable className={styles.scroll}>
          <div className={styles.families}>
            {icons.map(this.renderFamily, this)}
          </div>
        </Scrollable>
      </div>
    );
  }

  renderFamily (iconFamily, key) {
    const {selectedFamily, changeSelectedFamily} = this.props;
    return (
      <FamilyButton
        selected={key === selectedFamily}
        label={iconFamily.family}
        id={key}
        key={key}
        onClick={changeSelectedFamily}
      />
    );
  }
}
