import * as pageBuilderActions from 'actions/page-builder';

import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import ElementsMenu from './elements-menu';

@dataConnect(
  (state) => ({
    symbols: state.symbols,
    elementsMenuOptions: state.pageBuilder.elementsMenuOptions,
    elements: state.pageBuilder.elements,
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
    symbols: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired
  };

  render () {
    return <ElementsMenu {...this.props} />;
  }
}
