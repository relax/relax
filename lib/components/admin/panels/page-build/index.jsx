import React from 'react';
import {Component, mergeFragments} from 'relax-framework';

import PageBuilderContainer from '../../../../containers/page-builder';

export default class PageBuild extends Component {
  static fragments = mergeFragments({
    page: {
      _id: 1,
      __v: 1,
      state: 1
    },
    tab: {
      _id: {
        _id: 1,
        _userId: 1
      },
      page: {
        _id: 1,
        title: 1
      }
    },
    draft: {
      _id: {
        _id: 1,
        _userId: 1
      },
      __v: 1,
      data: 1,
      actions: 1
    },
    colors: {
      _id: 1,
      label: 1,
      value: 1
    }
  }, PageBuilderContainer.fragments)

  render () {
    return (
      <PageBuilderContainer {...this.props} />
    );
  }
}
