import forEach from 'lodash.foreach';
import GeminiScrollbar from 'react-gemini-scrollbar';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Combobox from '../combobox';

export default class Filters extends Component {
  static propTypes = {
    sort: PropTypes.object.isRequired,
    mimeTypes: PropTypes.array.isRequired,
    filterMime: PropTypes.string.isRequired,
    changeMime: PropTypes.func.isRequired,
    changeSort: PropTypes.func.isRequired
  }

  sortChange (key, value) {
    this.props.changeSort(key, value);
  }

  render () {
    const mimeFilterOptions = {
      labels: ['ALL'],
      values: ['all']
    };
    forEach(this.props.mimeTypes, (mimeType) => {
      const splitted = mimeType.split('/');
      if (splitted[1]) {
        mimeFilterOptions.labels.push(splitted[1].toUpperCase());
        mimeFilterOptions.values.push(mimeType);
      }
    });
    return (
      <div className='content-scrollable'>
        <GeminiScrollbar autoshow>
          <div className='option'>
            <div className='label'>Sort by</div>
            <Combobox
              labels={['Date', 'Size', 'Dimensions']}
              values={['_id', 'filesize', 'dimension']}
              value={this.props.sort.property}
              className='medium-combobox'
              onChange={this.sortChange.bind(this, 'property')}
            />
            <Combobox
              labels={['Asc', 'Desc']}
              values={['asc', 'desc']}
              value={this.props.sort.order}
              className='small-combobox'
              onChange={this.sortChange.bind(this, 'order')}
            />
          </div>
          <div className='option'>
            <div className='label'>Filter by type</div>
            <Combobox
              {...mimeFilterOptions}
              value={this.props.filterMime}
              onChange={this.props.changeMime}
            />
          </div>
        </GeminiScrollbar>
      </div>
    );
  }
}
