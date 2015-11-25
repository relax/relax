import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

export default class SearchBar extends Component {
  static propTypes = {
    view: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    changeView: PropTypes.func.isRequired,
    changeSearch: PropTypes.func.isRequired
  }

  onChangeView (view) {
    this.props.changeView(view);
  }

  onSearchChange (event) {
    this.props.changeSearch(event.target.value);
  }

  render () {
    return (
      <div className='search-bar'>
        <span className={cx('view-switch', this.props.view === 'small' && 'active')} onClick={this.onChangeView.bind(this, 'small')}>
          <i className='material-icons'>photo_size_select_large</i>
        </span>
        <span className={cx('view-switch', this.props.view === 'big' && 'active')} onClick={this.onChangeView.bind(this, 'big')}>
          <i className='material-icons'>photo_size_select_actual</i>
        </span>
        <div className='search-part'>
          <div className='search-input'>
            <i className='material-icons'>search</i>
            <input type='text' value={this.props.search} onChange={::this.onSearchChange} />
          </div>
        </div>
      </div>
    );
  }
}
