import Component from 'components/component';
import isElementSelected from 'helpers/page-builder/is-element-selected';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';
import {editSymbol} from 'actions/page-builder';

import SymbolComp from './symbol';
import propsSchema from './props-schema';
import settings from './settings';

@dataConnect(
  (state, props) => {
    const editing = state.pageBuilder && isElementSelected(
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
    editData: PropTypes.object,
    Element: PropTypes.func.isRequired
  };

  static propsSchema = propsSchema;
  static settings = settings;

  componentWillReceiveProps (nextProps) {
    if (this.props.symbolId !== nextProps.symbolId && nextProps.symbolId) {
      this.props.relate.refresh();
    }
  }

  render () {
    const {Element, loading, relax, symbol, symbolId, editing, editData} = this.props;

    return (
      <SymbolComp
        editSymbol={this.props.editSymbol}
        relax={relax}
        loading={loading}
        symbol={symbol}
        symbolId={symbolId}
        editing={editing}
        editData={editData}
        Element={Element}
      />
    );
  }
}
