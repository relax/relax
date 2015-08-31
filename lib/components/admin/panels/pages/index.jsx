import React from 'react';
import {Component} from 'relax-framework';
import List from './list';
import Filter from '../../../filter';
import Lightbox from '../../../lightbox';
import Manage from './manage';

import pagesStore from '../../../../client/stores/pages';
import pageActions from '../../../../client/actions/page';

export default class Pages extends Component {
  getInitialState () {
    return {
      pages: this.context.pages,
      search: (this.context.query && this.context.query.s) || '',
      lightbox: false
    };
  }

  getInitialCollections () {
    return {
      pages: pagesStore.getCollection()
    };
  }

  onAddNew (values) {
    pageActions
      .add({
        title: values.title,
        slug: values.slug
      })
      .then(() => {
        this.setState({
          lightbox: false
        });
      });
  }

  addNewClick (event) {
    event.preventDefault();
    this.setState({
      lightbox: true
    });
  }

  closeLightbox () {
    this.setState({
      lightbox: false
    });
  }

  renderLightbox () {
    if (this.state.lightbox) {
      return (
        <Lightbox className='small' title='Create page' onClose={this.closeLightbox.bind(this)}>
          <Manage onSubmit={this.onAddNew.bind(this)} />
        </Lightbox>
      );
    }
  }

  render () {
    return (
      <div className='admin-pages'>
        <div className='filter-menu'>
          <span className='admin-title'>Pages</span>
          <a href='#' className='button-clean' onClick={this.addNewClick.bind(this)}>
            <i className='material-icons'>library_add</i>
            <span>Add new page</span>
          </a>
          <Filter
            sorts={[{label: 'Date', property: 'date'}, {label: 'Title', property: 'title'}, {label: 'Slug', property: 'slug'}]}
            url='/admin/pages'
            search='title'
          />
        </div>
        <div className='admin-scrollable'>
          <List data={this.state.pages} />
        </div>
        {this.renderLightbox()}
      </div>
    );
  }
}

Pages.contextTypes = {
  pages: React.PropTypes.array.isRequired,
  query: React.PropTypes.object
};
