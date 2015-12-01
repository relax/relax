import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import {Droppable} from './dnd';

export default class ElementComponent extends Component {
  static propTypes = {
    pageBuilder: PropTypes.object,
    pageBuilderActions: PropTypes.object,
    element: PropTypes.object.isRequired,
    elementId: PropTypes.string.isRequired,
    children: PropTypes.node,
    dnd: PropTypes.object,
    dndActions: PropTypes.object
  }

  renderContent (customProps, children = this.props.children) {
    let result;
    const editing = this.props.pageBuilder && this.props.pageBuilder.editing;
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
          {children}
        </Droppable>
      );
    } else {
      result = children;
    }

    return result;
  }
}
