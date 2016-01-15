import * as symbolsActions from '../../../client/actions/symbols';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import settings from './settings';
import Component from '../component';
import Element from '../element';

@connect(
  (state) => ({
    symbols: state.symbols
  }),
  (dispatch) => bindActionCreators(symbolsActions, dispatch)
)
export default class DynamicListContainer extends Component {
  static fragments = {
    symbol: {
      _id: 1,
      title: 1,
      data: 1
    }
  }

  static propTypes = {
    symbols: PropTypes.object.isRequired,
    symbolId: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  }

  getInitState () {
    this.fetchSymbol(this.props);
    return {};
  }

  fetchSymbol (props) {
    if (props.symbolId && (!props.symbols[props.symbolId] || !props.symbols[props.symbolId].data) && !this.fething) {
      this.fething = true;
      props.getSymbol(props.symbolId, this.constructor.fragments);
    }
  }

  render () {
    const props = {
      htmlTag: 'div',
      info: this.props,
      settings: settings,
      className: 'symbol'
    };

    return (
      <Element {...props}>
        {this.props.children}
      </Element>
    );
  }
}
