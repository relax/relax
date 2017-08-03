import bind from 'decorators/bind';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {makeElementSymbol, makeElementDynamic, duplicateElement, removeElement} from 'actions/page-builder';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ContextMenu from './context-menu';

@connect(
  () => ({}),
  (dispatch) => bindActionCreators({
    makeElementSymbol,
    makeElementDynamic,
    duplicateElement,
    removeElement
  }, dispatch)
)
export default class ContextMenuContainer extends Component {
  static propTypes = {
    element: PropTypes.object.isRequired
  };

  getInitState () {
    return {
      opened: false,
      addingSymbol: false,
      symbolTitle: ''
    };
  }

  @bind
  openAddingSymbol () {
    this.setState({
      addingSymbol: true
    });
  }

  @bind
  closeAddingSymbol () {
    this.setState({
      addingSymbol: false
    });
  }

  @bind
  onSymbolChange (event) {
    this.setState({
      symbolTitle: event.target.value
    });
  }

  @bind
  open () {
    this.setState({
      opened: true
    });
  }

  @bind
  close () {
    this.setState({
      opened: false
    });
  }

  render () {
    return (
      <ContextMenu
        {...this.props}
        {...this.state}
        open={this.open}
        close={this.close}
        openAddingSymbol={this.openAddingSymbol}
        closeAddingSymbol={this.closeAddingSymbol}
        onSymbolChange={this.onSymbolChange}
      />
    );
  }
}
