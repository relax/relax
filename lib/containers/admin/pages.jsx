import React, {PropTypes} from 'react';
import {Component, buildQueryAndVariables} from 'relax-framework';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Pages from '../../components/admin/panels/pages';
import queryProps from '../../decorators/query-props';
import * as pagesActions from '../../actions/pages';

@connect(
  (state) => ({
    pages: state.pages.data.items,
    count: state.pages.data.count
  }),
  (dispatch) => bindActionCreators(pagesActions, dispatch)
)
@queryProps({
  page: 1,
  limit: 10
})
export default class PagesContainer extends Component {
  static fragments = Pages.fragments

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

  static panelSettings = {
    activePanelType: 'pages',
    breadcrumbs: [
      {
        label: 'Pages'
      }
    ]
  }

  render () {
    return (
      <Pages {...this.props} {...this.state} />
    );
  }
}
