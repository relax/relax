import React from 'react';
import {Component} from 'relax-framework';
import {Droppable} from './drag';

import stylesStore from '../client/stores/styles';

export default class ElementComponent extends Component {

  getInitialModels () {
    var models = {};

    if (this.constructor.settings.styles && this.props.style && typeof this.props.style === 'string' && this.props.style !== '') {
      models.style = stylesStore.getModel(this.props.style);
    }

    return models;
  }

  componentWillReceiveProps (nextProps) {
    if (this.constructor.settings.styles) {
      if (typeof nextProps.style === 'object') {
        this.unsetModels(['style']);
        this.setState({
          style: nextProps.style
        });
      } else {
        if (nextProps.style && nextProps.style !== this.props.style && nextProps.style !== '') {
          this.setModels({
            style: stylesStore.getModel(nextProps.style)
          });
        } else if (!nextProps.style || nextProps.style === '' || nextProps.style === null) {
          this.unsetModels(['style']);
          this.setState({
            style: false
          });
        }
      }
    }
    if (nextProps.selected) {
      this.onStateChangeBind = this.onStateChange.bind(this);
      document.addEventListener('setState', this.onStateChangeBind, false);
    } else if (this.onStateChangeBind) {
      document.removeEventListener('setState', this.onStateChangeBind);
      this.onStateChangeBind = false;
    }
  }

  componentWillUnmount () {
    if (this.onStateChangeBind) {
      document.removeEventListener('setState', this.onStateChangeBind);
    }
  }

  onStateChange (event) {
    this.setState(event.detail);
  }

  renderContent (customProps) {
    if (this.context.editing) {
      var dropInfo = {
        id: this.props.element.id
      };

      return (
        <Droppable type={this.props.element.tag} dropInfo={dropInfo} {...this.constructor.settings.drop} {...customProps} placeholder={true}>
          {this.props.children}
        </Droppable>
      );
    } else {
      return this.props.children;
    }
  }
}

ElementComponent.contextTypes = {
  editing: React.PropTypes.bool.isRequired
};
