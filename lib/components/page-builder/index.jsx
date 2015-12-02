import cx from 'classnames';
import key from 'keymaster';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import {Component as JSS} from 'relax-jss';

import stylesheet from '../../helpers/stylesheet';
import Canvas from './canvas';
import ElementsMenu from './elements-menu';
import GeneralElementsMenu from './general-elements-menu';
import Menu from './menu';
import {Dragger} from '../dnd';

export default class PageBuilder extends Component {
  static propTypes = {
    dnd: PropTypes.object.isRequired,
    dndActions: PropTypes.object.isRequired,
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired
  }

  componentDidMount () {
    if (window !== undefined) {
      const {undoAction, redoAction} = this.props.pageBuilderActions;
      key('⌘+z, ctrl+z', undoAction);
      key('⌘+y, ctrl+y', redoAction);
      // key('delete', );
    }
  }

  componentWillUnmount () {
    key.unbind('⌘+z, ctrl+z');
    key.unbind('⌘+y, ctrl+y');
  }

  draggedComponent () {
    const {dragInfo, dropInfo} = this.props.dnd;

    if (dropInfo && dragInfo) {
      this.props.pageBuilderActions.draggedComponent(dragInfo, dropInfo);
    }
  }

  render () {
    return (
      <div className={cx('page-builder', !this.props.pageBuilder.editing && 'preview')}>
        <JSS stylesheet={stylesheet} />
        <Canvas {...this.props} />
        <Menu {...this.props} />
        <GeneralElementsMenu {...this.props} />
        {this.renderElementsMenu()}
        {this.renderDragger()}
      </div>
    );
  }

  renderElementsMenu () {
    const {elementsMenuOpened} = this.props.pageBuilder;
    if (elementsMenuOpened) {
      return (
        <ElementsMenu {...this.props} />
      );
    }
  }

  renderDragger () {
    const {dragging} = this.props.dnd;
    if (dragging) {
      return (
        <Dragger
          onStopDrag={::this.draggedComponent}
          dnd={this.props.dnd}
          dndActions={this.props.dndActions}
        />
      );
    }
  }
}
