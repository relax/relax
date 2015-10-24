import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Canvas from './canvas';
import ElementsMenu from './elements-menu';
import GeneralElementsMenu from './general-elements-menu';
import JSSReact from '../../react-jss/jss-react';
import Menu from './menu';
import {Dragger} from '../dnd';

export default class PageBuilder extends Component {
  static propTypes = {
    dnd: PropTypes.object.isRequired,
    dndActions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    actions: PropTypes.array.isRequired,
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    draftActions: PropTypes.object.isRequired
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
        <JSSReact />
        <Canvas
          pageBuilder={this.props.pageBuilder}
          pageBuilderActions={this.props.pageBuilderActions}
          data={this.props.data}
          dnd={this.props.dnd}
          dndActions={this.props.dndActions}
        />
        <Menu
          pageBuilder={this.props.pageBuilder}
          pageBuilderActions={this.props.pageBuilderActions}
          dnd={this.props.dnd}
          dndActions={this.props.dndActions}
        />
        <GeneralElementsMenu
          pageBuilder={this.props.pageBuilder}
          pageBuilderActions={this.props.pageBuilderActions}
          dnd={this.props.dnd}
          dndActions={this.props.dndActions}
        />
        {this.renderElementsMenu()}
        {this.renderDragger()}
      </div>
    );
  }

  renderElementsMenu () {
    const {elementsMenuOpened} = this.props.pageBuilder;
    if (elementsMenuOpened) {
      return (
        <ElementsMenu
          pageBuilder={this.props.pageBuilder}
          pageBuilderActions={this.props.pageBuilderActions}
          dnd={this.props.dnd}
          dndActions={this.props.dndActions}
        />
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
