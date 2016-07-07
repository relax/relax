import ElementEmpty from 'components/element-empty';
import ElementLoading from 'components/element-loading';
import ElementNotFound from 'components/element-not-found';
import React, {PropTypes} from 'react';

import settings from './settings';
import Component from '../component';
import Element from '../element';

export default class DynamicListContainer extends Component {
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
    relax: PropTypes.object.isRequired
  };

  render () {
    const props = {
      htmlTag: 'div',
      ...this.props.relax,
      settings
    };

    return (
      <Element {...props}>
        {this.renderContent()}
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
    const {symbol, relax} = this.props;
    return relax.renderElement({
      customData: symbol.data,
      editing: false
    }, 'base', 0);
  }

  renderNotFound () {
    return (
      <ElementNotFound>Symbol not found</ElementNotFound>
    );
  }
}
