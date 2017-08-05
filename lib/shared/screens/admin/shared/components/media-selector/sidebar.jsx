import Button from 'components/button';
import Component from 'components/component';
import Scrollable from 'components/scrollable';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './sidebar.less';
import Filters from './filters';
import Selected from './selected';

export default class MediaSelectorSidebar extends Component {
  static propTypes = {
    selected: PropTypes.string,
    changeSort: PropTypes.func.isRequired,
    changeOrder: PropTypes.func.isRequired,
    changeType: PropTypes.func.isRequired,
    sort: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    allowedType: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
  };

  render () {
    const {selected, changeSort, changeOrder, changeType, sort, order, type, allowedType, onClose} = this.props;
    return (
      <div>
        <div className={styles.header}>Media Selector</div>
        <Selected selected={selected} />
        <Scrollable className={styles.filters}>
          <div className={styles.wrapper}>
            <Filters
              changeSort={changeSort}
              changeOrder={changeOrder}
              changeType={changeType}
              sort={sort}
              order={order}
              type={type}
              allowedType={allowedType}
            />
          </div>
        </Scrollable>
        <div className={styles.done}>
          <Button primary full onClick={onClose}>Done</Button>
        </div>
      </div>
    );
  }
}
