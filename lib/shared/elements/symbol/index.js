import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import propsSchema from './props-schema';
import settings from './settings';
import Component from '../component';
import SymbolComp from './symbol';

@dataConnect(
  (props) => {
    let result = {};

    if (props.symbolId) {
      result = {
        fragments: SymbolComp.fragments,
        variablesTypes: {
          symbol: {
            id: 'ID!'
          }
        },
        initialVariables: {
          symbol: {
            id: props.symbolId
          }
        }
      };
    }

    return result;
  }
)
export default class SymbolContainer extends Component {
  static propTypes = {
    symbolId: PropTypes.string,
    relax: PropTypes.object.isRequired,
    relate: PropTypes.object.isRequired
  };

  static propsSchema = propsSchema;
  static settings = settings;

  componentWillReceiveProps (nextProps) {
    if (this.props.symbolId !== nextProps.symbolId && nextProps.symbolId) {
      this.props.relate.refresh();
    }
  }

  render () {
    const {loading, relax, symbol, symbolId} = this.props;

    return (
      <SymbolComp
        relax={relax}
        loading={loading}
        symbol={symbol}
        symbolId={symbolId}
      />
    );
  }
}
