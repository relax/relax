import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import {Droppable} from './dnd';

export default class ElementComponent extends Component {
  static propTypes = {
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    element: PropTypes.object.isRequired,
    elementId: PropTypes.string.isRequired,
    children: PropTypes.node,
    dnd: PropTypes.object.isRequired,
    dndActions: PropTypes.object.isRequired
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
    const {editing} = this.props.pageBuilder;
    if (editing) {
      const dropInfo = {
        id: this.props.elementId
      };

      result = (
        <Droppable
          type={this.props.element.tag}
          dropInfo={dropInfo}
          {...this.constructor.settings.drop}
          {...customProps}
          placeholder
          pageBuilder={this.props.pageBuilder}
          pageBuilderActions={this.props.pageBuilderActions}
          dnd={this.props.dnd}
          dndActions={this.props.dndActions}>
          {this.props.children}
        </Droppable>
      );
    } else {
      result = this.props.children;
    }
    return result;
  }
}
