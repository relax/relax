import forEach from 'lodash.foreach';
import Combobox from 'components/input-options/combobox';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {getMimeTypes} from 'helpers/mime-types';

import styles from './filters.less';

export default class Filters extends Component {
  static propTypes = {
    changeSort: PropTypes.func.isRequired,
    changeOrder: PropTypes.func.isRequired,
    changeType: PropTypes.func.isRequired,
    sort: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    allowedType: PropTypes.string.isRequired
  }

  sortChange (key, value) {
    this.props.changeSort(key, value);
  }

  render () {
    const {changeSort, changeOrder, changeType, sort, order, type, allowedType} = this.props;

    const mimeFilterOptions = {
      labels: ['ALL'],
      values: ['all']
    };
    const mimeTypes = getMimeTypes(allowedType);
    forEach(mimeTypes, (mimeType) => {
      const splitted = mimeType.split('/');
      if (splitted[1]) {
        mimeFilterOptions.labels.push(splitted[1].toUpperCase());
        mimeFilterOptions.values.push(mimeType);
      }
    });

    return (
      <div>
        <div className={styles.option}>
          <div className={styles.label}>Sort by</div>
          <Combobox
            labels={['Date', 'Size', 'Dimensions']}
            values={['_id', 'filesize', 'dimension']}
            value={sort}
            className={styles.mediumCombobox}
            onChange={changeSort}
          />
          <Combobox
            labels={['Asc', 'Desc']}
            values={['asc', 'desc']}
            value={order}
            className={styles.smallCombobox}
            onChange={changeOrder}
          />
        </div>
        <div className={styles.option}>
          <div className={styles.label}>Filter by type</div>
          <Combobox
            {...mimeFilterOptions}
            value={type}
            onChange={changeType}
          />
        </div>
      </div>
    );
  }
}
