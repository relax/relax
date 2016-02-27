import Balloon from 'components/balloon';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class ListSearchSort extends Component {
  static propTypes = {
    sorts: PropTypes.array.isRequired
  };

  getInitState () {
    return {
      opened: false
    };
  }

  toggleSorts () {
    this.setState({
      opened: !this.state.opened
    });
  }

  render () {
    return (
      <div className={styles.root}>
        <label className={styles.searchLabel}>
          <i className='nc-icon-mini ui-1_zoom'></i>
          <input type='text' className={styles.search} placeholder='Search..' />
        </label>
        <div className={styles.sort} onClick={::this.toggleSorts} ref='sort'>
          <span>Date desc</span>
          <i className='nc-icon-mini arrows-1_minimal-down'></i>
        </div>
        {this.renderSorts()}
      </div>
    );
  }

  renderSorts () {
    if (this.state.opened) {
      const {sorts} = this.props;
      return (
        <Balloon
          element={this.refs.sort}
          stickOptions={{horizontalPosition: 'center', onClose: ::this.toggleSorts}}
          white
          small
          unpadded
        >
          {sorts.map(this.renderSort, this)}
        </Balloon>
      );
    }
  }

  renderSort (sort, key) {
    return (
      <button className={styles.sortOption} key={key}>
        {sort.label}
      </button>
    );
  }
}
