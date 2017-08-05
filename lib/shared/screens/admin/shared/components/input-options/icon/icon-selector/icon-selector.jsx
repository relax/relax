import Component from 'components/component';
import ContentSearch from 'components/content-search';
import Modal from 'components/modal';
import Scrollable from 'components/scrollable';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './icon-selector.less';
import List from './list';
import Sidebar from './sidebar';

export default class IconSelector extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    icons: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    changeSearch: PropTypes.func.isRequired,
    changeSelectedFamily: PropTypes.func.isRequired,
    selectedFamily: PropTypes.number.isRequired,
    selected: PropTypes.object,
    search: PropTypes.string
  };

  render () {
    const {onClose} = this.props;

    return (
      <Modal big onClose={onClose}>
        {this.renderSidebar()}
        {this.renderContent()}
      </Modal>
    );
  }

  renderSidebar () {
    const {selected, changeSelectedFamily, icons, selectedFamily, onClose} = this.props;
    return (
      <div className={styles.sidebar}>
        <Sidebar
          icons={icons}
          selected={selected}
          selectedFamily={selectedFamily}
          changeSelectedFamily={changeSelectedFamily}
          onClose={onClose}
        />
      </div>
    );
  }

  renderContent () {
    const {icons, selectedFamily, selected, onChange, search, changeSearch, onClose} = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.topBar}>
          <ContentSearch
            value={search}
            onChange={changeSearch}
            className={styles.search}
            inputClassName={styles.searchInput}
            focused
          />
          <a className={styles.link} href={icons[selectedFamily].link} target='_blank'>
            {`${icons[selectedFamily].family} site`}
          </a>
        </div>
        <Scrollable className={styles.scroll}>
          <List
            family={icons[selectedFamily]}
            search={search}
            selected={selected}
            onChange={onChange}
            onClose={onClose}
          />
        </Scrollable>
      </div>
    );
  }
}
