import cx from 'classnames';
import key from 'keymaster';
import stylesheet from 'helpers/stylesheet';
import Component from 'components/component';
import Dragger from 'components/dnd/dragger';
import Portal from 'components/portal';
import React, {PropTypes} from 'react';
import {Component as Jss} from 'relax-jss';

import styles from './page-builder.less';
import Canvas from './canvas';
import ElementsMenu from './elements-menu';

export default class PageBuilder extends Component {
  static propTypes = {
    dragging: PropTypes.bool.isRequired,
    elementsMenuOpened: PropTypes.bool.isRequired,
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
        <Jss stylesheet={stylesheet} />
        <Canvas />
        {this.renderElementsMenu()}
        {this.renderDragger()}
      </div>
    );
  }

  renderElementsMenu () {
    const {elementsMenuOpened} = this.props;
    if (elementsMenuOpened) {
      return (
        <Portal>
          <ElementsMenu />
        </Portal>
      );
    }
  }

  renderDragger () {
    const {dragging, pageBuilderActions} = this.props;
    if (dragging) {
      return (
        <Dragger onStopDrag={pageBuilderActions.draggedComponent} />
      );
    }
  }
}
