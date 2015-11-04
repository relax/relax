import * as pagesActions from '../../client/actions/pages';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import queryProps from '../../decorators/query-props';
import Pages from '../../components/admin/panels/pages';

@connect(
  (state) => ({
    pages: state.pages.data.items,
    count: state.pages.data.count
  }),
  (dispatch) => bindActionCreators(pagesActions, dispatch)
)
@queryProps({
  page: 1,
  limit: 10,
  sort: '_id',
  order: 'desc'
})
export default class PagesContainer extends Component {
  static fragments = Pages.fragments

  static panelSettings = {
    activePanelType: 'pages',
    breadcrumbs: [
      {
        label: 'Pages'
      }
    ]
  }

  static propTypes = {
    hasQueryChanged: PropTypes.bool.isRequired,
    queryVariables: PropTypes.object.isRequired
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.hasQueryChanged) {
      const vars = {
        pages: {
          ...nextProps.queryVariables
        }
      };

      nextProps
        .getAdmin(buildQueryAndVariables(
          this.constructor.fragments,
          vars
        ))
        .done();
    }
  }

  render () {
    return (
      <Pages {...this.props} {...this.state} />
    );
  }
}
