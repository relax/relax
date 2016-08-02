import isElementSelected from 'helpers/is-element-selected';
import React, {PropTypes} from 'react';
import {editSymbol} from 'actions/page-builder';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import propsSchema from './props-schema';
import settings from './settings';
import Component from '../component';
import SymbolComp from './symbol';

@dataConnect(
  (state, props) => {
    const editing = isElementSelected(
      state.pageBuilder.focused,
      {
        id: props.relax.element.id,
        context: props.relax.context
      }
    );
    const map = {
      editing
    };

    if (editing) {
      map.editData = state.pageBuilder.symbolsData[props.symbolId].doc[props.symbolId];
    }

    return map;
  },
  (dispatch) => bindActionCreators({editSymbol}, dispatch),
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
    relate: PropTypes.object.isRequired,
    editData: PropTypes.object
  };

  static propsSchema = propsSchema;
  static settings = settings;

  componentWillReceiveProps (nextProps) {
    if (this.props.symbolId !== nextProps.symbolId && nextProps.symbolId) {
      this.props.relate.refresh();
    }
  }

  render () {
    const {loading, relax, symbol, symbolId, editing, editData} = this.props;

    return (
      <SymbolComp
        editSymbol={this.props.editSymbol}
        relax={relax}
        loading={loading}
        symbol={symbol}
        symbolId={symbolId}
        editing={editing}
        editData={editData}
      />
    );
  }
}
