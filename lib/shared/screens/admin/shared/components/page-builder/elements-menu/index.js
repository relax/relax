import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import ElementsMenu from './elements-menu';

@dataConnect()
@connect(
  (state) => ({
    symbols: state.symbols
  })
)
export default class ElementsMenuContainer extends Component {
  static propTypes = {
    symbols: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired
  };

  initialize () {
    this.props.fetchData({
      fragments: ElementsMenu.fragments
    });
  }

  render () {
    const {symbols} = this.props;
    return <ElementsMenu symbols={symbols} />;
  }
}
