import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Component} from 'relax-framework';

import ElementsMenu from '../components/page-builder/elements-menu';

@connect(
  (state) => ({
    symbols: state.symbols
  })
)
export default class ElementsMenuContainer extends Component {
  static propTypes = {
    symbols: PropTypes.object.isRequired
  }

  render () {
    return <ElementsMenu {...this.props} />;
  }
}
