import bind from 'decorators/bind';
import debounce from 'decorators/debounce';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

export default class ListSearchSort extends Component {
  static propTypes = {
    search: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string
  };

  getInitState () {
    return {
      search: this.props.search
    };
  }

  @bind
  @debounce(300)
  changeSearch () {
    this.props.onChange(this.state.search);
  }

  @bind
  onFocus () {
    this.setState({
      focused: true,
      search: this.props.search
    });
  }

  @bind
  onBlur () {
    if (this.state.search !== this.props.search) {
      this.changeSearch();
    }
    this.setState({
      focused: false
    });
  }

  @bind
  updateSearch (event) {
    this.setState({
      search: event.target.value
    });
    this.changeSearch();
  }

  render () {
    const {focused} = this.state;
    const {placeholder} = this.props;

    return (
      <label className={styles.searchLabel}>
        <i className='nc-icon-mini ui-1_zoom'></i>
        <input
          type='text'
          value={focused ? this.state.search : this.props.search}
          className={styles.search}
          placeholder={placeholder || 'Search..'}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.updateSearch}
        />
      </label>
    );
  }
}
