import * as pageBuilderActions from 'actions/page-builder';

import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import ElementsMenu from './elements-menu';

@dataConnect(
  (state) => ({
    elementsMenuOptions: state.pageBuilder.elementsMenuOptions,
    categories: state.pageBuilder.categories,
    categoriesCollapsed: state.pageBuilder.categoriesCollapsed
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch)
  }),
  () => ({
    fragments: ElementsMenu.fragments
  })
)
export default class ElementsMenuContainer extends Component {
  static propTypes = {
    symbols: PropTypes.array,
    pageBuilderActions: PropTypes.object.isRequired
  };

  render () {
    return <ElementsMenu {...this.props} />;
  }
}
