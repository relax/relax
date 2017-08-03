import Component from 'components/component';
import ElementEmpty from 'components/element-empty';
import ElementLoading from 'components/element-loading';
import ElementNotFound from 'components/element-not-found';
import bind from 'decorators/bind';
import React from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';

import Editing from './editing';
import settings from './settings';

export default class Symbol extends Component {
  static fragments = {
    symbol: {
      _id: 1,
      title: 1,
      data: 1
    }
  };

  static propTypes = {
    symbol: PropTypes.object,
    symbolId: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    relax: PropTypes.object.isRequired,
    editSymbol: PropTypes.func.isRequired,
    editing: PropTypes.bool,
    editData: PropTypes.object,
    Element: PropTypes.func.isRequired
  };

  @bind
  onEdit () {
    const {relax, symbolId, symbol, editSymbol} = this.props;

    if (symbolId && symbol && symbol.data) {
      editSymbol(relax.element.id, symbol, relax.context);
    }
  }

  render () {
    const {Element, relax} = this.props;
    const props = {
      htmlTag: 'div',
      ...relax,
      settings
    };

    if (relax.editing) {
      props.onDoubleClick = this.onEdit;
    }

    return (
      <Element {...props} ref={(ref) => {this.ref = findDOMNode(ref);}}>
        {this.renderContent()}
        {this.renderEditing()}
      </Element>
    );
  }

  renderContent () {
    const {loading, symbolId, symbol} = this.props;
    let result;

    if (loading) {
      result = this.renderLoading();
    } else if (!symbolId) {
      result = this.renderEmpty();
    } else if (symbol && symbol.data) {
      result = this.renderSymbol();
    } else {
      result = this.renderNotFound();
    }

    return result;
  }

  renderLoading () {
    return (
      <ElementLoading>Symbol Loading</ElementLoading>
    );
  }

  renderEmpty () {
    return (
      <ElementEmpty>Select a symbol</ElementEmpty>
    );
  }

  renderSymbol () {
    const {symbol, relax, editing, editData, symbolId} = this.props;
    // const content = relax.renderElement({
    //   customData: editData || symbol.data,
    //   editing,
    //   context: symbolId
    // }, 'base', 0);
    const content = relax.renderChildren({
      children: ['base'],
      data: editData || symbol.data,
      context: symbolId,
      editable: editing
    });
    let result;

    if (relax.editing && !editing) {
      result = (
        <div onDoubleClick={this.onEdit}>{content}</div>
      );
    } else {
      result = content;
    }

    return result;
  }

  renderNotFound () {
    return (
      <ElementNotFound>Symbol not found</ElementNotFound>
    );
  }

  renderEditing () {
    const {editing, relax, symbolId} = this.props;
    if (editing && this.ref) {
      return (
        <Editing
          element={this.ref}
          elementId={relax.element.id}
          symbolId={symbolId}
        />
      );
    }
  }
}
