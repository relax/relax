import Button from 'components/button';
import Component from 'components/component';
import Scrollable from 'components/scrollable';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './sidebar.less';
import FamilyButton from './family-button';

export default class Sidebar extends Component {
  static propTypes = {
    icons: PropTypes.array.isRequired,
    selected: PropTypes.object,
    selectedFamily: PropTypes.number.isRequired,
    changeSelectedFamily: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };

  render () {
    const {icons, onClose} = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.header}>Icons</div>
        <Scrollable className={styles.scroll}>
          <div className={styles.families}>
            {icons.map(this.renderFamily, this)}
          </div>
        </Scrollable>
        {this.renderCurrent()}
        <div className={styles.done}>
          <Button primary full onClick={onClose}>Done</Button>
        </div>
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

  renderCurrent () {
    const {selected} = this.props;

    return (
      <div className={styles.selected}>
        <div className={styles.iconPart}>
          <i className={selected && selected.className}>
            {selected && selected.content}
          </i>
        </div>
        <div className={styles.infoPart}>
          <div className={styles.currentLabel}>Current selected</div>
          <div className={styles.info}>
            {selected && selected.family}
          </div>
          <div className={styles.info}>
            {selected && (selected.content || selected.className)}
          </div>
        </div>
      </div>
    );
  }
}
