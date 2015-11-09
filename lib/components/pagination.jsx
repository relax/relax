import clone from 'lodash.clone';
import React from 'react';
import {Component} from 'relax-framework';

import A from './a';
import Utils from '../utils';

export default class Pagination extends Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    query: React.PropTypes.object,
    count: React.PropTypes.number
  }

  static defaultProps = {
    query: {
      page: 1,
      limit: 10
    },
    count: 0
  }

  render () {
    return (
      <div className='pagination'>
        {this.props.query && this.renderButtons()}
      </div>
    );
  }

  renderButtons () {
    const numPages = Math.ceil(this.props.count / this.props.query.limit);
    const buttons = [];

    buttons.push(this.renderPreviousButton());
    for (let i = 0; i < numPages; i++) {
      buttons.push(this.renderButton(i + 1));
    }
    buttons.push(this.renderNextButton(numPages));

    return buttons;
  }

  renderButton (number) {
    let result;

    if (this.props.query.page !== number) {
      const query = clone(this.props.query);
      query.page = number;
      const url = Utils.parseQueryUrl(this.props.url, query);

      result = (
        <A className='pagination-button to' query={query} href={url} key={number}>
          {number}
        </A>
      );
    } else {
      result = (
        <span className='pagination-button to' key={number}>
          {number}
        </span>
      );
    }

    return result;
  }

  renderNextButton (numPages) {
    let result;

    if (this.props.query.page < numPages) {
      const query = clone(this.props.query);
      query.page ++;
      const url = Utils.parseQueryUrl(this.props.url, query);

      result = (
        <A className='pagination-button next' href={url} key='next'>
          <i className='material-icons'>navigate_next</i>
        </A>
      );
    } else {
      result = (
        <span className='pagination-button next' key='next'>
          <i className='material-icons'>navigate_next</i>
        </span>
      );
    }

    return result;
  }

  renderPreviousButton () {
    let result;

    if (this.props.query.page > 1) {
      const query = clone(this.props.query);
      query.page --;
      const url = Utils.parseQueryUrl(this.props.url, query);

      result = (
        <A className='pagination-button previous' href={url} key='previous'>
          <i className='material-icons'>navigate_before</i>
        </A>
      );
    } else {
      result = (
        <span className='pagination-button previous' key='previous'>
          <i className='material-icons'>navigate_before</i>
        </span>
      );
    }

    return result;
  }
}
