import Component from 'components/component';
import ContentLoading from 'components/content-loading';
import Dragger from 'components/dnd/dragger';
import Portal from 'components/portal';
import cx from 'classnames';
import key from 'keymaster';
import stylesheet from 'helpers/stylesheet';
import React from 'react';
import PropTypes from 'prop-types';
import {Component as Jss} from 'relax-jss';

import Canvas from './canvas';
import ElementsMenu from './elements-menu';
import styles from './page-builder.less';

export default class PageBuilder extends Component {
  static propTypes = {
    dragging: PropTypes.bool.isRequired,
    elementsMenuOpened: PropTypes.bool.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    template: PropTypes.object,
    templateId: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired
  };

  componentDidMount () {
    const {
      undoAction,
      redoAction,
      removeSelectedElement,
      copySelectedElement,
      pasteSelectedElement
    } = this.props.pageBuilderActions;

    key('⌘+z, ctrl+z', 'pageBuilder', undoAction);
    key('⌘+y, ⌘+⇧+z, ctrl+y', 'pageBuilder', redoAction);
    key('backspace, del, delete', 'pageBuilder', removeSelectedElement);
    key('⌘+c, ctrl+c', 'pageBuilder', copySelectedElement);
    key('⌘+v, ctrl+v', 'pageBuilder', pasteSelectedElement);

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
    const {template, templateId, type} = this.props;

    return (
      <div className={cx(styles.root)}>
        <Jss stylesheet={stylesheet} />
        <Canvas
          template={templateId && template}
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
