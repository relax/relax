import bind from 'decorators/bind';
import Component from 'components/component';
import Portal from 'components/portal';
import Stick from 'components/stick';
import React, {PropTypes} from 'react';
import {closeEditSymbol, saveSymbol} from 'actions/page-builder';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Editing from './editing';

@connect(
  (state) => ({
    loading: state.symbols.loading
  }),
  (dispatch) => bindActionCreators({closeEditSymbol, saveSymbol}, dispatch)
)
export default class EditingSymbolContainer extends Component {
  static propTypes = {
    element: PropTypes.any.isRequired,
    closeEditSymbol: PropTypes.func.isRequired,
    saveSymbol: PropTypes.func.isRequired,
    elementId: PropTypes.string.isRequired,
    symbolId: PropTypes.string.isRequired,
    loading: PropTypes.bool
  };

  @bind
  save () {
    const {elementId, symbolId} = this.props;
    this.props.saveSymbol(symbolId, elementId);
  }

  render () {
    const {element, loading} = this.props;

    return (
      <Portal>
        <Stick
          element={element}
          verticalPosition='bottom'
          horizontalPosition='center'
          horizontalOffset={0}
          verticalOffset={-1}
        >
          <Editing
            onCancel={this.props.closeEditSymbol}
            onSave={this.save}
            loading={loading}
          />
        </Stick>
      </Portal>
    );
  }
}
