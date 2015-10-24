import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import {Droppable} from './dnd';

export default class ElementComponent extends Component {
  static propTypes = {
    editing: PropTypes.bool.isRequired,
    element: PropTypes.object.isRequired,
    children: PropTypes.node
  }

  componentWillReceiveProps (nextProps) {
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
    let result;
    if (this.context.editing) {
      var dropInfo = {
        id: this.props.element.id
      };

      result = (
        <Droppable type={this.props.element.tag} dropInfo={dropInfo} {...this.constructor.settings.drop} {...customProps} placeholder>
          {this.props.children}
        </Droppable>
      );
    } else {
      result = this.props.children;
    }
    return result;
  }
}
