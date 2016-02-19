import * as pageBuilderActions from 'actions/page-builder';

import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ElementsMenu from './elements-menu';

@dataConnect()
@connect(
  (state) => ({
    symbols: state.symbols,
    elementsMenuOptions: state.pageBuilder.elementsMenuOptions,
    elements: state.pageBuilder.elements,
    categories: state.pageBuilder.categories,
    categoriesCollapsed: state.pageBuilder.categoriesCollapsed
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch)
  })
)
export default class ElementsMenuContainer extends Component {
  static propTypes = {
    symbols: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
    pageBuilderActions: PropTypes.object.isRequired
  };

  initialize () {
    this.props.fetchData({
      fragments: ElementsMenu.fragments
    });
  }

  render () {
    return <ElementsMenu {...this.props} />;
  }
}
