import cx from 'classnames';
import key from 'keymaster';
import stylesheet from 'helpers/stylesheet';
import Component from 'components/component';
import ContentLoading from 'components/content-loading';
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
    pageBuilderActions: PropTypes.object.isRequired,
    template: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired
  };

  componentDidMount () {
    const {undoAction, redoAction, removeSelectedElement} = this.props.pageBuilderActions;

    key('⌘+z, ctrl+z', 'pageBuilder', undoAction);
    key('⌘+y, ctrl+y', 'pageBuilder', redoAction);
    key('backspace, del, delete', 'pageBuilder', removeSelectedElement);

    key.setScope('pageBuilder');
  }

  componentWillUnmount () {
    key.deleteScope('pageBuilder');
  }

  render () {
    const {loading} = this.props;
    let result;

    if (loading) {
      result = this.renderLoading();
    } else {
      result = this.renderContent();
    }

    return result;
  }

  renderContent () {
    const {template, type} = this.props;

    return (
      <div className={cx(styles.root)}>
        <Jss stylesheet={stylesheet} />
        <Canvas
          template={template}
          type={type}
        />
        {this.renderElementsMenu()}
        {this.renderDragger()}
      </div>
    );
  }

  renderLoading () {
    return (
      <ContentLoading />
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
