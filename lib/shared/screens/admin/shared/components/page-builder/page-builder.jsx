import cx from 'classnames';
import key from 'keymaster';
import stylesheet from 'helpers/stylesheet';
import Component from 'components/component';
import Dragger from 'components/dnd/dragger';
import Portal from 'components/portal';
import React, {PropTypes} from 'react';
import {Component as JSS} from 'relax-jss';

import styles from './page-builder.less';
import Canvas from './canvas';
import ElementsMenu from './elements-menu';

export default class PageBuilder extends Component {
  static propTypes = {
    dnd: PropTypes.object.isRequired,
    dndActions: PropTypes.object.isRequired,
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired
  };

  componentDidMount () {
    const {undoAction, redoAction} = this.props.pageBuilderActions;
    key('⌘+z, ctrl+z', undoAction);
    key('⌘+y, ctrl+y', redoAction);
    // key('delete', );
  }

  componentWillUnmount () {
    key.unbind('⌘+z, ctrl+z');
    key.unbind('⌘+y, ctrl+y');
  }

  render () {
    return (
      <div className={cx(styles.root)}>
        <JSS stylesheet={stylesheet} />
        <Canvas {...this.props} />
        {this.renderElementsMenu()}
        {this.renderDragger()}
      </div>
    );
  }

  renderElementsMenu () {
    const {elementsMenuOpened} = this.props.pageBuilder;
    if (elementsMenuOpened) {
      return (
        <Portal>
          <ElementsMenu {...this.props} />
        </Portal>
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
