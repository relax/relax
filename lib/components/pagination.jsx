import React from 'react';
import {Component} from 'relax-framework';
import clone from 'lodash.clone';
import A from './a';
import Utils from '../utils';

export default class Pagination extends Component {

  renderPreviousButton () {
    let result;

    if (this.context.query.page > 1) {
      let query = clone(this.context.query);
      query.page --;
      let url = Utils.parseQueryUrl(this.props.url, query);

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

  renderNextButton (numPages) {
    let result;

    if (this.context.query.page < numPages) {
      let query = clone(this.context.query);
      query.page ++;
      let url = Utils.parseQueryUrl(this.props.url, query);

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

  renderButton (number) {
    let result;

    if (this.context.query.page !== number) {
      let query = clone(this.context.query);
      query.page = number;
      let url = Utils.parseQueryUrl(this.props.url, query);

      result = (
        <A className='pagination-button to' href={url} key={number}>
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

  renderButtons () {
    const numPages = Math.ceil(this.context.count / this.context.query.limit);

    let buttons = [];

    buttons.push(this.renderPreviousButton());

    for (let i = 0; i < numPages; i++) {
      buttons.push(this.renderButton(i+1));
    }

    buttons.push(this.renderNextButton(numPages));

    return buttons;
  }

  render () {
    return (
      <div className='pagination'>
        {this.renderButtons()}
      </div>
    );
  }
}

Pagination.propTypes = {
  url: React.PropTypes.string.isRequired
};

Pagination.contextTypes = {
  query: React.PropTypes.object.isRequired,
  count: React.PropTypes.number.isRequired
};
