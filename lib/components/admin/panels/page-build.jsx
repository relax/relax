import React from 'react';
import {Component} from 'relax-framework';
import PageBuilder from '../../page-builder';

export default class Page extends Component {
  render () {
    return (
      <PageBuilder data={this.context.page || {}} />
    );
  }
}

Page.contextTypes = {
  page: React.PropTypes.object.isRequired
};
